import type { EventObject, ExtractEvent } from 'xstate';

/**
 * Assert that the event object passed in is of the type specified in the second argument.
 * @throws if the event object is not of the type specified in the second argument.
 * @param event The event to check.
 * @param eventType The type of event to check for on th event's `type` property.
 */
export function assertEventType<TEvent extends EventObject, TEventType extends TEvent['type']>(
  event: TEvent,
  eventType: TEventType,
): asserts event is ExtractEvent<TEvent, TEventType> {
  if (event.type !== eventType) {
    throw new Error(`Expected event of type ${eventType}, but got ${event.type}`);
  }
}
