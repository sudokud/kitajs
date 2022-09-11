import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Native } from './types';

//@ts-ignore unused
export type Path<Name extends string = string> = string;

/** **The usage of this parameter requires `@fastify/cookies` set up!** */
//@ts-ignore unused
export type Cookie<Name> = string | undefined;

/** Cannot be used with BodyProp */
export type Body<Obj> = Obj;

//@ts-ignore unused
export type BodyProp<Type, Path extends string = string> = Type;

/**
 * @example
 * ```ts
 * export function get(
 *   name: Query, // defaults to string
 *   age: Query<number>, // custom type
 *   ageString: Query<'age'>, // custom name
 *   customNamed: Query<boolean, 'custom-naming'> // Custom type and name
 *   extended: Query<Extended>, // custom type. If this mode is used, it must be the only query parameter
 * ) {}
 * ```
 */
//@ts-ignore unused
export type Query<
  Type = string,
  //@ts-ignore unused
  Name extends Type extends string
    ? 'Name must be the second parameter'
    : string = Type extends string ? 'Name must be the second parameter' : string
> = Type extends string ? string : Type;

/**
 * @example
 * ```ts
 * export function get(
 *   date: Header, // Date header (case insensitive)
 *   cacheControl: Header<'Cache-Control'>, // Custom name (case insensitive)
 * ) {}
 * ```
 */
//@ts-ignore unused
export type Header<Name extends String> = string;

/** The Fastify request type */
export type Req = FastifyRequest;

/** The Fastify reply type */
export type Rep = FastifyReply;

/** A custom parameter type. */
//@ts-ignore unused
export type CustomParameter<Result, Parameters extends Native[]> = Result;

/**
 * The parameter type of the connection.
 *
 * **NOTE**: Only works on `WebSocket` routes
 *
 * @example
 * export function ws(
 *   this: Route<'subscribeUsers'>,
 *   conn: Conn,
 *   req: Req,
 * ) {}
 */
//@ts-ignore - may not be used / present
export type Conn = import('@fastify/websocket').SocketStream;

/**
 * The parameter type of the websocket connection.
 *
 * **NOTE**: Only works on `WebSocket` routes
 *
 * @example
 * export function ws(
 *   this: Route<'subscribeUsers'>,
 *   socket: Sock,
 *   req: Req,
 * ) {}
 */
//@ts-ignore - may not be used / present
export type Sock = import('@fastify/websocket').SocketStream['socket'];
