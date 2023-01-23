import { KitaTestBuilder } from '../../builder';

type Resp = { a: 1 };

export function get(): Resp {
  return { a: 1 };
}

describe('this options variations', () => {
  const test = KitaTestBuilder.build(__filename, exports, {
    schema: {
      defaultResponse: '2xx',
      generator: {
        additionalProperties: true
      },
      responses: {
        '3xx': {
          description: 'Redirect'
        }
      }
    }
  });

  it('works', async () => {
    const { KitaAST } = await test;

    const route = KitaAST.routes[0]!;

    expect(route).toBeDefined();

    expect(route.schema.response).toStrictEqual({
      '2xx': { $ref: 'Resp' },
      '3xx': { description: 'Redirect' }
    });

    const respSchema = KitaAST.schemas.find((s) => s.$id === 'Resp');

    expect(respSchema).toBeDefined();

    expect(respSchema).toStrictEqual({
      $id: 'Resp',
      type: 'object',
      properties: {
        a: {
          const: 1,
          type: 'number'
        }
      },
      required: ['a']
    });
  });
});