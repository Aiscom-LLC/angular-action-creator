/* eslint-disable */
export type SyncActionType<T extends object> = ActionCreator<string, (props?: T & NotAllowedCheck<T>) => T & TypedAction<string>>;

export type AsyncActionType<
  Started extends Record<string, unknown>,
  Successed extends Record<string, unknown>,
  Failed extends Record<string, unknown>
> = {
  started: SyncActionType<Started>,
  success: SyncActionType<Successed>,
  failed: SyncActionType<Failed>
}

export interface Action {
  type: string;
}

export declare interface TypedAction<T extends string> extends Action {
  readonly type: T;
}

export type FunctionWithParametersType<P extends unknown[], R = void> = (
  ...args: P
) => R;

export type Creator<
  P extends any[] = any[],
  R extends object = object
> = FunctionWithParametersType<P, R>;

export type ActionType<A> = A extends ActionCreator<infer T, infer C>
  ? ReturnType<C> & { type: T }
  : never;

export type ActionCreator<
  T extends string = string,
  C extends Creator = Creator
> = C & TypedAction<T>;

export type NotAllowedCheck<T extends object> = T extends any[]
  ? ArraysAreNotAllowed
  : T extends { type: any }
  ? TypePropertyIsNotAllowed
  : keyof T extends never
  ? EmptyObjectsAreNotAllowed
  : unknown;


export const arraysAreNotAllowedMsg =
  'arrays are not allowed in action creators';
type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg;

export const typePropertyIsNotAllowedMsg =
  'type property is not allowed in action creators';
type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg;

export const emptyObjectsAreNotAllowedMsg =
  'empty objects are not allowed in action creators';
type EmptyObjectsAreNotAllowed = typeof emptyObjectsAreNotAllowedMsg;