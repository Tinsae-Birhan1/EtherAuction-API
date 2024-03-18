import EventEmitter from '../../src/utils/EventEmitter';

describe('EventEmitter', () => {
  it('should emit event', () => {
    const eventName = 'testEvent';
    const eventData = { message: 'Test message' };
    const listenerFn = jest.fn();

    EventEmitter.on(eventName, listenerFn);
    EventEmitter.emit(eventName, eventData);

    expect(listenerFn).toHaveBeenCalledWith(eventData);
  });

  it('should remove event listener', () => {
    const eventName = 'testEvent';
    const listenerFn = jest.fn();

    EventEmitter.on(eventName, listenerFn);
    EventEmitter.off(eventName, listenerFn);
    EventEmitter.emit(eventName);

    expect(listenerFn).not.toHaveBeenCalled();
  });
});
