import { useActor } from '@xstate/react';
import { useEffect, useRef } from 'react';
import { ActorRef } from 'xstate';

type Resolver = (value: undefined) => void;
type EmptyPromise = Promise<undefined>;

type SuspensefulState<TResult> =
  | {
      status: 'loading';
      promise: EmptyPromise;
      resolve: Resolver;
      result: null;
    }
  | {
      status: 'resolved';
      promise: EmptyPromise;
      resolve: Resolver;
      result: TResult;
    };

interface Resource<TResult> {
  read: () => never | TResult;
}

/**
 * A suspenseful wrapper around XState's useActor.
 * Use suspense to wait for a specific condition in the machine state before rendering.
 * @param actorRef - the actor reference to use to get the actorRef
 * @param condition - A callback that returns whether a particular condition in the provided state is met
 */
export function useSuspensefulActor<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TActor extends ActorRef<any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState = TActor extends ActorRef<any, infer TEmitted> ? TEmitted : never,
>(actorRef: TActor, condition: (state: TState) => boolean): Resource<[TState, TActor['send']]> {
  const actor = useActor(actorRef);
  const [state] = actor;
  let resolveValue: Resolver;
  const promise: EmptyPromise = new Promise((resolve) => {
    resolveValue = resolve;
  });

  const ref = useRef<SuspensefulState<[TState, TActor['send']]>>({
    promise,
    // @ts-ignore ignore this error
    resolve: resolveValue,
    status: 'loading',
    result: null,
  });

  useEffect(() => {
    if (ref.current.status === 'resolved') {
      ref.current.result = actor;
    }
  }, [ref.current.status, actor]);

  if (condition(state)) {
    ref.current.status = 'resolved';
    ref.current.result = actor;
    ref.current.resolve(undefined);
  }

  return {
    read(): never | [TState, TActor['send']] {
      switch (ref.current.status) {
        case 'resolved':
          return ref.current.result;
        case 'loading':
        default:
          throw ref.current.promise;
      }
    },
  };
}
