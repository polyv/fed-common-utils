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
export declare type EventType = number | string | symbol;
/**
 * 事件参数关系类型
 */
export declare type EventRelationsType = Record<EventType, unknown>;
/**
 * 事件回调函数类型
 */
export declare type EventHandler<Relations extends EventRelationsType, E extends EventType> = (params: Relations[E]) => unknown;
export declare class EventEmitter<Relations extends EventRelationsType = EventRelationsType, Events extends EventType = string> {
    /**
     * 事件回调存储器
     * @ignore
     */
    private __eventStore;
    /**
     * 添加监听事件
     * @ignore
     */
    private __addOnEvent;
    /**
     * 监听事件
     * @param event 事件名
     * @param handler 回调函数
     * @param context this 上下文
     */
    on<E extends Events>(event: E, handler: EventHandler<Relations, E>, context?: unknown): void;
    /**
     * 监听事件（一次性）
     * @param event 事件名
     * @param handler 回调函数
     * @param context this 上下文
     */
    once<E extends Events>(event: E, handler: EventHandler<Relations, E>, context?: unknown): void;
    /**
     * 移除事件监听
     * @param event 事件名
     * @param handler 回调函数
     */
    off<E extends Events>(event: E, handler: unknown): void;
    /**
     * 触发事件
     * @param event 事件名
     * @param params 回调参数
     */
    emit<E extends Events>(event: E, params: Relations[E]): void;
    emit<E extends Events>(event: undefined extends Relations[E] ? E : never): void;
    /**
     * 销毁实例
     */
    destroy(): void;
}
