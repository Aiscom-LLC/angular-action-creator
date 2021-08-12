import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { ErrorState, ActionCreatorProps } from './interfaces';

export class ActionCreator {
  private prefix: string;
  constructor(prefix: string) {
    this.prefix = `[${prefix}]`;
  }

  createAction<T extends Record<string, any>>(type: string): TypedAction<string> {
    return createAction(`${this.prefix} ${type}`, props<T>() as ActionCreatorProps<any>);
  }

  createAsyncAction<Q extends Record<string, any>, W extends Record<string, any>, E extends Record<string, any> = ErrorState>(type: string): {
    started: TypedAction<string>,
    success: TypedAction<string>,
    failed: TypedAction<string>
  } {
    return {
      started: createAction(`${this.prefix} ${type}_STARTED`, props<Q>() as ActionCreatorProps<any>),
      success: createAction(`${this.prefix} ${type}_SUCCESS`, props<W>() as ActionCreatorProps<any>),
      failed: createAction(`${this.prefix} ${type}_FAILED`, props<E>() as ActionCreatorProps<any>),
    }
  }
}
