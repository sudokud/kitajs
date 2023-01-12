/**
 * The filename to be used when creating a Piscina instance.
 *
 * @example
 * import { filename } from './routes';
 * const piscina = new Piscina({ filename });
 */
export const filename = __filename;

if (require('piscina')?.isWorkerThread) {
  const controllers: Record<string, Record<string, Function>> = {};

  module.exports.asyncTest = async (args: any[]) => {
    if (!controllers['AsyncController']) {
      controllers['AsyncController'] = require('./AsyncController');
    }

    return controllers['AsyncController']!.get!.apply(undefined, args);
  };

  //@ts-expect-error - NodeJS modules are wrapped into a function, so this return will work.
  return;
}

import type { RouteContext, ProvidedRouteContext } from '@kitajs/runtime';
import fp from 'fastify-plugin';
import '@fastify/swagger';
import '@fastify/cookie';
import * as $name$Controller from './routes/[name]';
import * as AsyncController from './routes/async';
import * as HelloWorldController from './routes/hello-world';
import * as PingController from './routes/ping';
import * as PrimitiveTypesController from './routes/primitive-types';
import * as ResponseTypesController from './routes/response-types';
import * as ThisController from './routes/this';
import AuthParam from './helpers/auth-param';

/**
 * This is the resolved config that was used during code generation. JIC its needed at runtime.
 */
export const config = {
  params: { AuthParam: '/www/kita/packages/test-package/src/helpers/auth-param' },
  tsconfig: './tsconfig.json',
  controllers: {
    glob: ['src/routes/**/*.ts', 'routes/**/*.ts'],
    prefix: '(?:.*src)?/?(?:routes/?)'
  },
  routes: {
    output: '/www/kita/packages/test-package/src/routes.ts',
    format: {
      parser: 'typescript',
      arrowParens: 'always',
      bracketSpacing: true,
      endOfLine: 'lf',
      insertPragma: false,
      bracketSameLine: false,
      jsxSingleQuote: false,
      printWidth: 90,
      proseWrap: 'always',
      quoteProps: 'as-needed',
      requirePragma: false,
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'none',
      useTabs: false
    }
  }
};

/**
 * The Kita generated fastify plugin. Registering it into your fastify instance will
 * automatically register all routes, schemas and controllers.
 *
 * @example
 * ```ts
 * import { Kita } from './routes'; // this file
 * import app from './fastify-app';
 *
 * app.register(Kita, { context: { ... } })
 * ```
 */
export const Kita = fp<{ context: ProvidedRouteContext }>((fastify, options) => {
  const context: RouteContext = { config, fastify, ...options.context };

  fastify.addSchema({
    $id: 'def-structure--294-308--287-309--285-309--239-329--0-330',
    type: 'object',
    properties: {
      a: {
        type: 'number',
        const: 1
      },
      b: {
        type: 'number',
        const: 2
      }
    },
    required: ['a', 'b'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'HelloWorldQuery',
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'number'
      }
    },
    required: ['name', 'age'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'NameQuery',
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    },
    required: ['name'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'withTypedPromiseResponseResponse',
    type: 'object',
    properties: {
      a: {
        type: 'string'
      }
    },
    required: ['a'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'withInferredResponseResponse',
    type: 'object',
    properties: {
      b: {
        type: 'string'
      }
    },
    required: ['b'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'PR',
    type: 'object',
    properties: {
      c: {
        type: 'string'
      }
    },
    required: ['c'],
    additionalProperties: false
  });

  fastify.addSchema({
    $id: 'DR',
    type: 'object',
    properties: {
      d: {
        type: 'string'
      }
    },
    required: ['d'],
    additionalProperties: false
  });

  fastify.route({
    method: 'PUT',
    url: '/:name',
    schema: {
      operationId: 'fullExampleUsingBody',
      params: {
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
        additionalProperties: false
      },
      body: {
        type: 'object',
        properties: { path: { type: 'number' }, bodyProp: { type: 'number' } },
        required: ['path', 'bodyProp'],
        additionalProperties: false
      },
      querystring: {
        type: 'object',
        properties: {
          paramQuery: { type: 'string' },
          typedQuery: { type: 'boolean' },
          namedQuery: { type: 'string' },
          typedAndNamedQuery: { type: 'boolean' }
        },
        required: ['paramQuery', 'typedQuery', 'namedQuery', 'typedAndNamedQuery'],
        additionalProperties: false
      },
      response: { default: { type: 'number' } },
      description: 'Route description 1',
      security: [{ default: [] }, { admin: ['read-user', 'write user', '4', '76'] }],
      tags: ['test tag 1'],
      summary: 'route summary 1'
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      const authJwt = await AuthParam.call(context, request, reply, ['jwt']);

      if (reply.sent) {
        return;
      }

      const authBasic = await AuthParam.call(context, request, reply, ['basic']);

      if (reply.sent) {
        return;
      }

      return $name$Controller.put.apply(context, [
        (request.params as { ['name']: Parameters<typeof $name$Controller.put>[0] })[
          'name'
        ],
        request.cookies?.cookie,
        (request.body as { ['path']: Parameters<typeof $name$Controller.put>[2] }).path,
        (request.body as { ['bodyProp']: Parameters<typeof $name$Controller.put>[3] })
          .bodyProp,
        request.query as string,
        request.query as boolean,
        request.query as string,
        request.query as boolean,
        request,
        reply,
        authJwt,
        authBasic
      ]);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/:name',
    schema: {
      operationId: 'fullExampleExclusiveQuery',
      params: {
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
        additionalProperties: false
      },
      body: { $ref: 'NameQuery' },
      querystring: { $ref: 'NameQuery' },
      response: { default: { type: 'number' } },
      description: 'route description 2',
      security: [{ default: [] }, { admin: ['read-user', 'write user', '4', '76'] }],
      tags: ['test tag 2'],
      summary: 'route summary 2'
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      const authJwt = await AuthParam.call(context, request, reply, ['jwt']);

      if (reply.sent) {
        return;
      }

      const authBasic = await AuthParam.call(context, request, reply, ['basic']);

      if (reply.sent) {
        return;
      }

      return $name$Controller.post.apply(context, [
        (request.params as { ['name']: Parameters<typeof $name$Controller.post>[0] })[
          'name'
        ],
        request.cookies?.cookie,
        request.body as Parameters<typeof $name$Controller.post>[2],
        request.query as Parameters<typeof $name$Controller.post>[3],
        request,
        reply,
        authJwt,
        authBasic
      ]);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/async',
    schema: { operationId: 'asyncTest', response: { default: { type: 'null' } } },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return context.piscina!.run([], { name: 'asyncTest' });
    }
  });

  fastify.route({
    method: 'POST',
    url: '/async',
    schema: { operationId: 'syncTest', response: { default: { type: 'null' } } },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return AsyncController.post.apply(context, []);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/hello-world',
    schema: {
      operationId: 'HelloWorldControllerGet',
      querystring: {
        type: 'object',
        properties: { name: { type: 'string' } },
        required: [],
        additionalProperties: false
      },
      response: { default: { type: 'string' } },
      description: 'Hello world rest API endpoint.'
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return HelloWorldController.get.apply(context, [
        request.query as string | undefined
      ]);
    }
  });

  fastify.get(
    '/ping',
    {
      schema: { hide: true, operationId: 'name' },
      websocket: true
    },
    //@ts-ignore - we may have unused params
    async (connection, request) => {
      return PingController.ws.apply(context, [
        connection as Parameters<typeof PingController.ws>[0]
      ]);
    }
  );

  fastify.route({
    method: 'POST',
    url: '/primitive-types',
    schema: {
      operationId: 'PrimitiveTypesControllerPost',
      body: { type: 'array', items: { type: ['string', 'number'] } },
      querystring: {
        type: 'object',
        properties: {
          param: { anyOf: [{ type: 'string' }, { not: {} }] },
          parm2: { type: ['boolean', 'number', 'null'] }
        },
        required: ['param', 'parm2'],
        additionalProperties: false
      },
      response: { default: { type: 'boolean' } },
      description: 'primitive complex queries'
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return PrimitiveTypesController.post.apply(context, [
        request.body as Parameters<typeof PrimitiveTypesController.post>[0],
        request.query as string | undefined,
        request.query as boolean | number | null
      ]);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/primitive-types',
    schema: {
      operationId: 'PrimitiveTypesControllerGet',
      querystring: { $ref: 'def-structure--294-308--287-309--285-309--239-329--0-330' },
      response: { default: { type: 'boolean' } },
      description: 'extended queries'
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return PrimitiveTypesController.get.apply(context, [
        request.query as Parameters<typeof PrimitiveTypesController.get>[0]
      ]);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/response-types',
    schema: {
      operationId: 'withTypedPromiseResponse',
      querystring: { $ref: 'HelloWorldQuery' },
      response: { default: { $ref: 'withTypedPromiseResponseResponse' } },
      tags: ['Response Test']
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ResponseTypesController.Get.apply(context, [
        request.query as Parameters<typeof ResponseTypesController.Get>[0]
      ]);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/response-types',
    schema: {
      operationId: 'withInferredResponse',
      querystring: { $ref: 'HelloWorldQuery' },
      response: { default: { $ref: 'withInferredResponseResponse' } },
      tags: ['Response Test']
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ResponseTypesController.Post.apply(context, [
        request.query as Parameters<typeof ResponseTypesController.Post>[0]
      ]);
    },
    preHandler: ResponseTypesController.preHandler
  });

  fastify.route({
    method: 'PUT',
    url: '/response-types',
    schema: {
      operationId: 'withPromiseTypeAlias',
      querystring: { $ref: 'HelloWorldQuery' },
      response: { default: { $ref: 'PR' } },
      tags: ['Response Test']
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ResponseTypesController.Put.apply(context, [
        request.query as Parameters<typeof ResponseTypesController.Put>[0]
      ]);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/response-types',
    schema: {
      operationId: 'withTypeAliasPromise',
      querystring: { $ref: 'HelloWorldQuery' },
      response: { default: { $ref: 'DR' } },
      tags: ['Response Test']
    },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ResponseTypesController.Delete.apply(context, [
        request.query as Parameters<typeof ResponseTypesController.Delete>[0]
      ]);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/this',
    schema: { operationId: 'getId', response: { default: { type: 'boolean' } } },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ThisController.get.apply(context, []);
    },
    ...ThisController.getConfig
  });

  fastify.route({
    method: 'POST',
    url: '/this',
    schema: { operationId: 'withSubTypeofs', response: { default: { type: 'boolean' } } },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ThisController.post.apply(context, []);
    },
    onRequest: [...ThisController.auth, ...ThisController.auth2]
  });

  fastify.route({
    method: 'DELETE',
    url: '/this',
    schema: { operationId: 'withImport', response: { default: { type: 'boolean' } } },
    //@ts-ignore - we may have unused params
    handler: async (request, reply) => {
      return ThisController.Delete.apply(context, []);
    },
    onRequest: require('./helpers/on-request').myCustomHook
  });

  // Ensure this function remains a "async" function
  return Promise.resolve();
});

/**
 * The extracted data from your controllers and configurations for this template hydration.
 * In case you need some metadata at runtime, this is the place to look.
 */
export const KitaAST = {
  config: {
    params: { AuthParam: '/www/kita/packages/test-package/src/helpers/auth-param' },
    tsconfig: './tsconfig.json',
    controllers: {
      glob: ['src/routes/**/*.ts', 'routes/**/*.ts'],
      prefix: '(?:.*src)?/?(?:routes/?)'
    },
    routes: {
      output: '/www/kita/packages/test-package/src/routes.ts',
      format: {
        parser: 'typescript',
        arrowParens: 'always',
        bracketSpacing: true,
        endOfLine: 'lf',
        insertPragma: false,
        bracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 90,
        proseWrap: 'always',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    }
  },
  routes: [
    {
      controllerMethod: 'put',
      method: 'PUT',
      controllerName: '$name$Controller',
      url: '/:name',
      controllerPath: 'src/routes/[name].ts:24',
      parameters: [
        {
          value:
            "(request.params as { ['name']: Parameters<typeof $name$Controller.put>[0] })['name']"
        },
        { value: 'request.cookies?.cookie' },
        {
          value:
            "(request.body as { ['path']: Parameters<typeof $name$Controller.put>[2] }).path"
        },
        {
          value:
            "(request.body as { ['bodyProp']: Parameters<typeof $name$Controller.put>[3] }).bodyProp"
        },
        { value: '(request.query as string)' },
        { value: '(request.query as boolean)' },
        { value: '(request.query as string)' },
        { value: '(request.query as boolean)' },
        { value: 'request' },
        { value: 'reply' },
        {
          value: 'authJwt',
          helper:
            "const authJwt = await AuthParam.call(context, request, reply, ['jwt']);"
        },
        {
          value: 'authBasic',
          helper:
            "const authBasic = await AuthParam.call(context, request, reply, ['basic']);"
        }
      ],
      schema: {
        operationId: 'fullExampleUsingBody',
        params: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
          additionalProperties: false
        },
        body: {
          type: 'object',
          properties: { path: { type: 'number' }, bodyProp: { type: 'number' } },
          required: ['path', 'bodyProp'],
          additionalProperties: false
        },
        querystring: {
          type: 'object',
          properties: {
            paramQuery: { type: 'string' },
            typedQuery: { type: 'boolean' },
            namedQuery: { type: 'string' },
            typedAndNamedQuery: { type: 'boolean' }
          },
          required: ['paramQuery', 'typedQuery', 'namedQuery', 'typedAndNamedQuery'],
          additionalProperties: false
        },
        response: { default: { type: 'number' } },
        description: 'Route description 1',
        security: [{ default: [] }, { admin: ['read-user', 'write user', '4', '76'] }],
        tags: ['test tag 1'],
        summary: 'route summary 1'
      },
      rendered:
        'fastify.route({\n  method: \'PUT\',\n  url: \'/:name\',\n  schema: {"operationId":"fullExampleUsingBody","params":{"type":"object","properties":{"name":{"type":"string"}},"required":["name"],"additionalProperties":false},"body":{"type":"object","properties":{"path":{"type":"number"},"bodyProp":{"type":"number"}},"required":["path","bodyProp"],"additionalProperties":false},"querystring":{"type":"object","properties":{"paramQuery":{"type":"string"},"typedQuery":{"type":"boolean"},"namedQuery":{"type":"string"},"typedAndNamedQuery":{"type":"boolean"}},"required":["paramQuery","typedQuery","namedQuery","typedAndNamedQuery"],"additionalProperties":false},"response":{"default":{"type":"number"}},"description":"Route description 1","security":[{"default":[]},{"admin":["read-user","write user","4","76"]}],"tags":["test tag 1"],"summary":"route summary 1"},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n        const authJwt = await AuthParam.call(context, request, reply, [\'jwt\']);\n\n        if (reply.sent) {\n          return;\n        }\n        \n        const authBasic = await AuthParam.call(context, request, reply, [\'basic\']);\n\n        if (reply.sent) {\n          return;\n        }\n        \n\n    return $name$Controller.put.apply(context, [(request.params as { [\'name\']: Parameters<typeof $name$Controller.put>[0] })[\'name\'],request.cookies?.cookie,(request.body as { [\'path\']: Parameters<typeof $name$Controller.put>[2] }).path,(request.body as { [\'bodyProp\']: Parameters<typeof $name$Controller.put>[3] }).bodyProp,(request.query as string),(request.query as boolean),(request.query as string),(request.query as boolean),request,reply,authJwt,authBasic]);\n  },\n  \n});',
      operationId: 'fullExampleUsingBody'
    },
    {
      controllerMethod: 'post',
      method: 'POST',
      controllerName: '$name$Controller',
      url: '/:name',
      controllerPath: 'src/routes/[name].ts:60',
      parameters: [
        {
          value:
            "(request.params as { ['name']: Parameters<typeof $name$Controller.post>[0] })['name']"
        },
        { value: 'request.cookies?.cookie' },
        { value: 'request.body as Parameters<typeof $name$Controller.post>[2]' },
        { value: '(request.query as Parameters<typeof $name$Controller.post>[3])' },
        { value: 'request' },
        { value: 'reply' },
        {
          value: 'authJwt',
          helper:
            "const authJwt = await AuthParam.call(context, request, reply, ['jwt']);"
        },
        {
          value: 'authBasic',
          helper:
            "const authBasic = await AuthParam.call(context, request, reply, ['basic']);"
        }
      ],
      schema: {
        operationId: 'fullExampleExclusiveQuery',
        params: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
          additionalProperties: false
        },
        body: { $ref: 'NameQuery' },
        querystring: { $ref: 'NameQuery' },
        response: { default: { type: 'number' } },
        description: 'route description 2',
        security: [{ default: [] }, { admin: ['read-user', 'write user', '4', '76'] }],
        tags: ['test tag 2'],
        summary: 'route summary 2'
      },
      rendered:
        'fastify.route({\n  method: \'POST\',\n  url: \'/:name\',\n  schema: {"operationId":"fullExampleExclusiveQuery","params":{"type":"object","properties":{"name":{"type":"string"}},"required":["name"],"additionalProperties":false},"body":{"$ref":"NameQuery"},"querystring":{"$ref":"NameQuery"},"response":{"default":{"type":"number"}},"description":"route description 2","security":[{"default":[]},{"admin":["read-user","write user","4","76"]}],"tags":["test tag 2"],"summary":"route summary 2"},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n        const authJwt = await AuthParam.call(context, request, reply, [\'jwt\']);\n\n        if (reply.sent) {\n          return;\n        }\n        \n        const authBasic = await AuthParam.call(context, request, reply, [\'basic\']);\n\n        if (reply.sent) {\n          return;\n        }\n        \n\n    return $name$Controller.post.apply(context, [(request.params as { [\'name\']: Parameters<typeof $name$Controller.post>[0] })[\'name\'],request.cookies?.cookie,request.body as Parameters<typeof $name$Controller.post>[2],(request.query as Parameters<typeof $name$Controller.post>[3]),request,reply,authJwt,authBasic]);\n  },\n  \n});',
      operationId: 'fullExampleExclusiveQuery'
    },
    {
      controllerMethod: 'get',
      method: 'GET',
      controllerName: 'AsyncController',
      url: '/async',
      controllerPath: 'src/routes/async.ts:5',
      parameters: [],
      schema: { operationId: 'asyncTest', response: { default: { type: 'null' } } },
      rendered:
        'fastify.route({\n  method: \'GET\',\n  url: \'/async\',\n  schema: {"operationId":"asyncTest","response":{"default":{"type":"null"}}},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return context.piscina!.run([], { name: \'asyncTest\' });\n  },\n  \n});',
      importablePath: './routes/async',
      async: true,
      operationId: 'asyncTest'
    },
    {
      controllerMethod: 'post',
      method: 'POST',
      controllerName: 'AsyncController',
      url: '/async',
      controllerPath: 'src/routes/async.ts:10',
      parameters: [],
      schema: { operationId: 'syncTest', response: { default: { type: 'null' } } },
      rendered:
        'fastify.route({\n  method: \'POST\',\n  url: \'/async\',\n  schema: {"operationId":"syncTest","response":{"default":{"type":"null"}}},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return AsyncController.post.apply(context, []);\n  },\n  \n});',
      operationId: 'syncTest'
    },
    {
      controllerMethod: 'get',
      method: 'GET',
      controllerName: 'HelloWorldController',
      url: '/hello-world',
      controllerPath: 'src/routes/hello-world.ts:6',
      parameters: [{ value: '(request.query as string| undefined)' }],
      schema: {
        operationId: 'HelloWorldControllerGet',
        querystring: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: [],
          additionalProperties: false
        },
        response: { default: { type: 'string' } },
        description: 'Hello world rest API endpoint.'
      },
      rendered:
        'fastify.route({\n  method: \'GET\',\n  url: \'/hello-world\',\n  schema: {"operationId":"HelloWorldControllerGet","querystring":{"type":"object","properties":{"name":{"type":"string"}},"required":[],"additionalProperties":false},"response":{"default":{"type":"string"}},"description":"Hello world rest API endpoint."},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return HelloWorldController.get.apply(context, [(request.query as string| undefined)]);\n  },\n  \n});'
    },
    {
      controllerMethod: 'ws',
      method: 'GET',
      controllerName: 'PingController',
      url: '/ping',
      controllerPath: 'src/routes/ping.ts:6',
      parameters: [{ value: 'connection as Parameters<typeof PingController.ws>[0]' }],
      schema: { hide: true, operationId: 'name' },
      rendered:
        'fastify.get(\n  \'/ping\',\n  {\n    schema: {"hide":true,"operationId":"name"},\n    websocket: true,\n    \n  },\n  //@ts-ignore - we may have unused params\n  async (connection, request) => {\n\n    return PingController.ws.apply(context, [connection as Parameters<typeof PingController.ws>[0]]);\n  }\n);',
      websocket: true,
      operationId: 'name'
    },
    {
      controllerMethod: 'post',
      method: 'POST',
      controllerName: 'PrimitiveTypesController',
      url: '/primitive-types',
      controllerPath: 'src/routes/primitive-types.ts:4',
      parameters: [
        { value: 'request.body as Parameters<typeof PrimitiveTypesController.post>[0]' },
        { value: '(request.query as string | undefined)' },
        { value: '(request.query as boolean | number | null)' }
      ],
      schema: {
        operationId: 'PrimitiveTypesControllerPost',
        body: { type: 'array', items: { type: ['string', 'number'] } },
        querystring: {
          type: 'object',
          properties: {
            param: { anyOf: [{ type: 'string' }, { not: {} }] },
            parm2: { type: ['boolean', 'number', 'null'] }
          },
          required: ['param', 'parm2'],
          additionalProperties: false
        },
        response: { default: { type: 'boolean' } },
        description: 'primitive complex queries'
      },
      rendered:
        'fastify.route({\n  method: \'POST\',\n  url: \'/primitive-types\',\n  schema: {"operationId":"PrimitiveTypesControllerPost","body":{"type":"array","items":{"type":["string","number"]}},"querystring":{"type":"object","properties":{"param":{"anyOf":[{"type":"string"},{"not":{}}]},"parm2":{"type":["boolean","number","null"]}},"required":["param","parm2"],"additionalProperties":false},"response":{"default":{"type":"boolean"}},"description":"primitive complex queries"},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return PrimitiveTypesController.post.apply(context, [request.body as Parameters<typeof PrimitiveTypesController.post>[0],(request.query as string | undefined),(request.query as boolean | number | null)]);\n  },\n  \n});'
    },
    {
      controllerMethod: 'get',
      method: 'GET',
      controllerName: 'PrimitiveTypesController',
      url: '/primitive-types',
      controllerPath: 'src/routes/primitive-types.ts:13',
      parameters: [
        { value: '(request.query as Parameters<typeof PrimitiveTypesController.get>[0])' }
      ],
      schema: {
        operationId: 'PrimitiveTypesControllerGet',
        querystring: { $ref: 'def-structure--294-308--287-309--285-309--239-329--0-330' },
        response: { default: { type: 'boolean' } },
        description: 'extended queries'
      },
      rendered:
        'fastify.route({\n  method: \'GET\',\n  url: \'/primitive-types\',\n  schema: {"operationId":"PrimitiveTypesControllerGet","querystring":{"$ref":"def-structure--294-308--287-309--285-309--239-329--0-330"},"response":{"default":{"type":"boolean"}},"description":"extended queries"},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return PrimitiveTypesController.get.apply(context, [(request.query as Parameters<typeof PrimitiveTypesController.get>[0])]);\n  },\n  \n});'
    },
    {
      controllerMethod: 'Get',
      method: 'GET',
      controllerName: 'ResponseTypesController',
      url: '/response-types',
      controllerPath: 'src/routes/response-types.ts:6',
      parameters: [
        { value: '(request.query as Parameters<typeof ResponseTypesController.Get>[0])' }
      ],
      schema: {
        operationId: 'withTypedPromiseResponse',
        querystring: { $ref: 'HelloWorldQuery' },
        response: { default: { $ref: 'withTypedPromiseResponseResponse' } },
        tags: ['Response Test']
      },
      rendered:
        'fastify.route({\n  method: \'GET\',\n  url: \'/response-types\',\n  schema: {"operationId":"withTypedPromiseResponse","querystring":{"$ref":"HelloWorldQuery"},"response":{"default":{"$ref":"withTypedPromiseResponseResponse"}},"tags":["Response Test"]},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ResponseTypesController.Get.apply(context, [(request.query as Parameters<typeof ResponseTypesController.Get>[0])]);\n  },\n  \n});',
      operationId: 'withTypedPromiseResponse'
    },
    {
      controllerMethod: 'Post',
      method: 'POST',
      controllerName: 'ResponseTypesController',
      url: '/response-types',
      controllerPath: 'src/routes/response-types.ts:16',
      parameters: [
        { value: '(request.query as Parameters<typeof ResponseTypesController.Post>[0])' }
      ],
      schema: {
        operationId: 'withInferredResponse',
        querystring: { $ref: 'HelloWorldQuery' },
        response: { default: { $ref: 'withInferredResponseResponse' } },
        tags: ['Response Test']
      },
      rendered:
        'fastify.route({\n  method: \'POST\',\n  url: \'/response-types\',\n  schema: {"operationId":"withInferredResponse","querystring":{"$ref":"HelloWorldQuery"},"response":{"default":{"$ref":"withInferredResponseResponse"}},"tags":["Response Test"]},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ResponseTypesController.Post.apply(context, [(request.query as Parameters<typeof ResponseTypesController.Post>[0])]);\n  },\n  preHandler: ResponseTypesController.preHandler\n});',
      operationId: 'withInferredResponse',
      options: 'preHandler: ResponseTypesController.preHandler'
    },
    {
      controllerMethod: 'Put',
      method: 'PUT',
      controllerName: 'ResponseTypesController',
      url: '/response-types',
      controllerPath: 'src/routes/response-types.ts:28',
      parameters: [
        { value: '(request.query as Parameters<typeof ResponseTypesController.Put>[0])' }
      ],
      schema: {
        operationId: 'withPromiseTypeAlias',
        querystring: { $ref: 'HelloWorldQuery' },
        response: { default: { $ref: 'PR' } },
        tags: ['Response Test']
      },
      rendered:
        'fastify.route({\n  method: \'PUT\',\n  url: \'/response-types\',\n  schema: {"operationId":"withPromiseTypeAlias","querystring":{"$ref":"HelloWorldQuery"},"response":{"default":{"$ref":"PR"}},"tags":["Response Test"]},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ResponseTypesController.Put.apply(context, [(request.query as Parameters<typeof ResponseTypesController.Put>[0])]);\n  },\n  \n});',
      operationId: 'withPromiseTypeAlias'
    },
    {
      controllerMethod: 'Delete',
      method: 'DELETE',
      controllerName: 'ResponseTypesController',
      url: '/response-types',
      controllerPath: 'src/routes/response-types.ts:40',
      parameters: [
        {
          value: '(request.query as Parameters<typeof ResponseTypesController.Delete>[0])'
        }
      ],
      schema: {
        operationId: 'withTypeAliasPromise',
        querystring: { $ref: 'HelloWorldQuery' },
        response: { default: { $ref: 'DR' } },
        tags: ['Response Test']
      },
      rendered:
        'fastify.route({\n  method: \'DELETE\',\n  url: \'/response-types\',\n  schema: {"operationId":"withTypeAliasPromise","querystring":{"$ref":"HelloWorldQuery"},"response":{"default":{"$ref":"DR"}},"tags":["Response Test"]},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ResponseTypesController.Delete.apply(context, [(request.query as Parameters<typeof ResponseTypesController.Delete>[0])]);\n  },\n  \n});',
      operationId: 'withTypeAliasPromise'
    },
    {
      controllerMethod: 'get',
      method: 'GET',
      controllerName: 'ThisController',
      url: '/this',
      controllerPath: 'src/routes/this.ts:11',
      parameters: [],
      schema: { operationId: 'getId', response: { default: { type: 'boolean' } } },
      rendered:
        'fastify.route({\n  method: \'GET\',\n  url: \'/this\',\n  schema: {"operationId":"getId","response":{"default":{"type":"boolean"}}},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ThisController.get.apply(context, []);\n  },\n  ...ThisController.getConfig\n});',
      operationId: 'getId',
      options: '...ThisController.getConfig'
    },
    {
      controllerMethod: 'post',
      method: 'POST',
      controllerName: 'ThisController',
      url: '/this',
      controllerPath: 'src/routes/this.ts:19',
      parameters: [],
      schema: {
        operationId: 'withSubTypeofs',
        response: { default: { type: 'boolean' } }
      },
      rendered:
        'fastify.route({\n  method: \'POST\',\n  url: \'/this\',\n  schema: {"operationId":"withSubTypeofs","response":{"default":{"type":"boolean"}}},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ThisController.post.apply(context, []);\n  },\n  onRequest: [...ThisController.auth, ...ThisController.auth2]\n});',
      operationId: 'withSubTypeofs',
      options: 'onRequest: [...ThisController.auth, ...ThisController.auth2]'
    },
    {
      controllerMethod: 'Delete',
      method: 'DELETE',
      controllerName: 'ThisController',
      url: '/this',
      controllerPath: 'src/routes/this.ts:30',
      parameters: [],
      schema: { operationId: 'withImport', response: { default: { type: 'boolean' } } },
      rendered:
        'fastify.route({\n  method: \'DELETE\',\n  url: \'/this\',\n  schema: {"operationId":"withImport","response":{"default":{"type":"boolean"}}},\n  //@ts-ignore - we may have unused params\n  handler: async (request, reply) => {\n\n    return ThisController.Delete.apply(context, []);\n  },\n  onRequest: require(\'./helpers/on-request\').myCustomHook\n});',
      operationId: 'withImport',
      options: "onRequest: require('./helpers/on-request').myCustomHook"
    }
  ],
  schemas: [
    {
      $id: 'def-structure--294-308--287-309--285-309--239-329--0-330',
      type: 'object',
      properties: { a: { type: 'number', const: 1 }, b: { type: 'number', const: 2 } },
      required: ['a', 'b'],
      additionalProperties: false
    },
    {
      $id: 'HelloWorldQuery',
      type: 'object',
      properties: { name: { type: 'string' }, age: { type: 'number' } },
      required: ['name', 'age'],
      additionalProperties: false
    },
    {
      $id: 'NameQuery',
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
      additionalProperties: false
    },
    {
      $id: 'withTypedPromiseResponseResponse',
      type: 'object',
      properties: { a: { type: 'string' } },
      required: ['a'],
      additionalProperties: false
    },
    {
      $id: 'withInferredResponseResponse',
      type: 'object',
      properties: { b: { type: 'string' } },
      required: ['b'],
      additionalProperties: false
    },
    {
      $id: 'PR',
      type: 'object',
      properties: { c: { type: 'string' } },
      required: ['c'],
      additionalProperties: false
    },
    {
      $id: 'DR',
      type: 'object',
      properties: { d: { type: 'string' } },
      required: ['d'],
      additionalProperties: false
    }
  ],
  imports: [
    "import '@fastify/cookie';",
    "import * as $name$Controller from './routes/[name]';",
    "import * as AsyncController from './routes/async';",
    "import * as HelloWorldController from './routes/hello-world';",
    "import * as PingController from './routes/ping';",
    "import * as PrimitiveTypesController from './routes/primitive-types';",
    "import * as ResponseTypesController from './routes/response-types';",
    "import * as ThisController from './routes/this';",
    "import AuthParam from './helpers/auth-param';"
  ],
  hasAsync: true
};