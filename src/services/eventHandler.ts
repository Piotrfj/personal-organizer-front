export enum Events {
  ONE
}

export default new class {

  events: Map<Events, ((...any) => void)[]> = new Map();
  subscribe = (eventName: Events, cb: (...any) => void) => {
    const callbacks = this.events.get(eventName) || [];
    callbacks.push(cb);
    this.events.set(eventName, callbacks);
    console.log('subscribed')
  };
  emit = (eventName: Events, ...args) => {
    const callbacks = this.events.get(eventName) || [];
    callbacks.forEach(cb => {
      cb(...args);
    });
    console.log('emitted');
  };
};

// export default new Event();
