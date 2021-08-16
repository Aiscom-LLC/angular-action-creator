import { createAction, props } from '@ngrx/store';
import { ErrorState, ActionCreatorProps, SyncActionType, AsyncActionType } from './interfaces';

export class ActionCreator {
  private prefix: string;
  constructor(prefix: string) {
    this.prefix = `[${prefix}]`;
  }
  /* eslint-disable */
  createAction<T extends object>(type: string): SyncActionType<T> {
    return createAction(`${this.prefix} ${type}`, props<T>() as ActionCreatorProps<any>) as SyncActionType<T>;
  }

  createAsyncAction<Q extends Record<string, any>, W extends Record<string, any>, E extends Record<string, any> = ErrorState>(type: string): AsyncActionType<Q, W, E> {
    return {
      started: createAction(`${this.prefix} ${type}_STARTED`, props<Q>() as ActionCreatorProps<any>) as SyncActionType<Q>,
      success: createAction(`${this.prefix} ${type}_SUCCESS`, props<W>() as ActionCreatorProps<any>) as SyncActionType<W>,
      failed: createAction(`${this.prefix} ${type}_FAILED`, props<E>() as ActionCreatorProps<any>) as SyncActionType<E>,
    }
  }
}
