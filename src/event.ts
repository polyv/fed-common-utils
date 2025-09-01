/**
 * 本模块提供事件触发器类。
 * @packageDocumentation
 *
 * @example
 * ```js
 * import { EventEmitter } from '@polyv/utils/es/event';
 *
 * const emitter = new EventEmitter();
 * const context = { name: 'my name' };
 *
 * function eventHandler(e) {
 *   console.log(e);
 *   console.log(this === context); // true
 * }
 *
 * // listen event
 * emitter.on('foo', eventHandler, context);
 *
 * // listen once event
 * emitter.once('foo', eventHandler, context);
 *
 * // fire event
 * emitter.emit('foo', { a: 1 });
 *
 * // unlisten event
 * emitter.off('foo', eventHandler);
 *
 * // ---------- use typescript define event parameter types ---------- //
 * type EventParams = {
 *   foo: string;
 *   boo: number;
 * };
 *
 * const emitter = new EventEmitter<EventParams>();
 *
 * emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'
 *
 * emitter.emit('foo', 18); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
 *
 * // ---------- use typescript define event enum ---------- //
 * enum TestEvent {
 *   Foo = 'foo',
 *   Bar = 'bar',
 * }
 *
 * type TestEventParams = {
 *   [TestEvent.Foo]: string;
 *   [TestEvent.Bar]: number;
 * };
 *
 * const emitter = new EventEmitter<TestEventParams, TestEvent>();
 *
 * emitter.emit(TestEvent.Foo, 'abc'); // ok
 *
 * emitter.emit('foo', 'abc'); // Error: Argument of type "'foo'" is not assignable to parameter of type 'TestEvent'. (2345)
 * ```
 */

/**
 * 事件类型
 */
export type EventType = number | string | symbol;

/**
 * 事件参数关系类型
 */
export type EventRelationsType = Record<EventType, unknown>;

/**
 * 事件监听方式
 */
type EventWay = 'normal' | 'once';

/**
 * 事件回调后的类 response 函数
 */
type EventHandlerCb = (res: unknown) => void;

/**
 * 事件回调函数类型
 */
export type EventHandler<Relations extends EventRelationsType, E extends EventType> = (
  params: Relations[E],
  cb?: EventHandlerCb
) => unknown;

interface EventStoreItem<Relations extends EventRelationsType, E extends EventType> {
  /** 事件类型 */
  type: EventWay;
  /** 事件回调方法 */
  handler: EventHandler<Relations, E>;
  /** 用于触发的回调方法，已绑定了 this */
  callbackHandler: EventHandler<Relations, E>;
}

type EventStore<Relations extends EventRelationsType, E extends EventType> = {
  [Key in E]?: Array<EventStoreItem<Relations, Key>>;
};

export class EventEmitter<
  Relations extends EventRelationsType = EventRelationsType,
  Events extends EventType = string,
> {
  /**
   * 事件回调存储器
   * @ignore
   */
  private __eventStore: EventStore<Relations, Events> = {};

  /**
   * 添加监听事件
   * @ignore
   */
  private __addOnEvent<E extends Events>(
    type: EventWay,
    event: E,
    handler: EventHandler<Relations, E>,
    context?: unknown,
  ): void {
    if (!event || !handler) {
      return;
    }

    let storeList = this.__eventStore[event];
    if (!storeList) {
      storeList = [];
    }

    storeList.push({
      type,
      handler,
      callbackHandler: handler.bind(context),
    });

    this.__eventStore[event] = storeList;
  }

  /**
   * 监听事件
   * @param event 事件名
   * @param handler 回调函数
   * @param context this 上下文
   */
  public on<E extends Events>(
    event: E,
    handler: EventHandler<Relations, E>,
    context: unknown = this,
  ): void {
    this.__addOnEvent('normal', event, handler, context);
  }

  /**
   * 监听事件（一次性）
   * @param event 事件名
   * @param handler 回调函数
   * @param context this 上下文
   */
  public once<E extends Events>(
    event: E,
    handler: EventHandler<Relations, E>,
    context: unknown = this,
  ): void {
    this.__addOnEvent('once', event, handler, context);
  }

  /**
   * 移除事件监听
   * @param event 事件名
   * @param handler 回调函数
   */
  public off<E extends Events>(event: E, handler: unknown): void {
    let storeList = this.__eventStore[event];
    if (!storeList) {
      return;
    }

    storeList = storeList.filter(data => {
      return data.handler !== handler;
    });
    this.__eventStore[event] = storeList;
  }

  /**
   * 触发事件
   * @param event 事件名
   * @param params 回调参数
   */
  public emit<E extends Events>(event: E, params: Relations[E], cb?: EventHandlerCb): void;
  public emit<E extends Events>(event: undefined extends Relations[E] ? E : never,): void;
  public emit<E extends Events>(
    event: undefined extends Relations[E] ? E : never,
    params?: Relations[E],
    cb?: EventHandlerCb,
  ): void {
    const storeList = this.__eventStore[event] as Array<EventStoreItem<Relations, E>>;
    if (!storeList) {
      return;
    }

    storeList.forEach(item => {
      const { type, handler, callbackHandler } = item;
      if (typeof callbackHandler === 'function') {
        callbackHandler(params as Relations[E], cb);
      }

      if (type === 'once') {
        this.off(event, handler);
      }
    });
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    this.__eventStore = {};
  }
}
