import uuid from 'uuid/v1';

export enum EventType {
  EDIT_HABIT
}

export default new class {
  events: Map<EventType, {id: number, cb: ((...any) => void)}[]> = new Map();

  subscribe = (eventName: EventType, cb: (...any) => void): number => {
    const callbacks = this.events.get(eventName) || [];
    const id = uuid();
    callbacks.push({id,cb});
    this.events.set(eventName, callbacks);
    return id;
  };

  emit = (eventName: EventType, ...args) => {
    const callbacks = this.events.get(eventName) || [];
    callbacks.forEach(event => {
      event.cb(...args);
    });
  };

  unsubscribe = (eventName: EventType, eventId) => {
    const callbacks = this.events.get(eventName);
    if (callbacks) {
      callbacks.filter(event => event.id !== eventId);
    }
  };

};

// export default new Event();
