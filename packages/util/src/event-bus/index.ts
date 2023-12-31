// https://pineco.de/creating-a-javascript-event-bus/
// https://lwebapp.com/en/post/event-bus

export default class EventBus {
  bus: any;

  /**
   * Initialize a new event bus instance.
   */
  constructor() {
    this.bus = document.createElement('event-element') as HTMLElement;
  }

  /**
   * Add an event listener.
   */
  addEventListener(event: string, callback: (payload: any) => any) {
    this.bus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event: string, callback: (payload: any) => any) {
    this.bus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event: string, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

/*
사용 예

import EventBus from './EventBus';
window.EventBus = new EventBus;

document.querySelector('#native-button').addEventListener('click', event => {
  window.EventBus.dispatchEvent('open-vue-modal', { id: 'specific-modal' });
});

window.EventBus.addEventListener('open-vue-modal', event => {
  if (event.detail.id === this.id) {
    this.open();
  }
});
*/
