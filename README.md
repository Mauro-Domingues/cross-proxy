# Cross-proxy

[![socket badge](https://socket.dev/api/badge/npm/package/cross-proxy)](https://socket.dev/npm/package/cross-proxy)
&nbsp;
[![npm version](https://img.shields.io/npm/v/cross-proxy.svg?color=CB3837)](https://www.npmjs.com/package/cross-proxy)
&nbsp;
[![install size](https://packagephobia.com/badge?p=cross-proxy)](https://packagephobia.com/result?p=cross-proxy)

### An isolated core abstraction layer for integrating various messaging systems such as Kafka, RabbitMQ, etc., enabling seamless communication and interchangeability based on the @nestjs/microservices.

---

### To install the project:

```bash
npm install cross-proxy
```

---

## How to use

There will be a class that must be extended by your core. There will be ready-made public methods and there will also be abstract methods that must be implemented in their core. `this.routingMap` is used to store asynchronous message callbacks and `this.handlers` is used to store callbacks that will be executed when a particular topic is called.

```typescript
import {
  IMessageOptionsDTO,
  IPatternDTO,
  IReadPacketDTO,
  IWritePacketDTO,
  Proxy,
} from 'cross-proxy';

/**
 * @description The type parameter `T` in `Proxy<T>` should represent the message options specific to the implementation.
 * */
export abstract class YourCore extends Proxy<unknown> {
  public constructor() {
    super(30000);
  }

  /**
   * @description Init your connection
   * */
  protected connect(): Promise<unknown> {}

  /**
   * @description Close your connections
   * */
  protected closeConnections(): Promise<unknown> {}

  /**
   * @description Subscribe a channel
   * */
  protected subscribe(pattern: IPatternDTO): void {}

  /**
   * @description A parser from cross-proxy message options to your core message options
   * */
  protected serializeMessageOptions(options?: IMessageOptionsDTO): unknown {}

  /**
   * @description Deserialize the message
   * */
  protected deserializeMessage<Input>(
    value: Input,
    message: unknown,
  ): IWritePacketDTO<Input> & { id: string } {}

  /**
   * @description Decode a value to a friendly result
   * */
  protected decode<Input, Val>(value: Val): Input | string | null | Buffer {}

  /**
   * @description Set a callback to execute by a topic
   * @example
   * // Must use this inside it plus your core business rules
   * this.handlers.set(topic, handlers)
   * */
  protected setListener<T, X>(data: {
    pattern: IPatternDTO;
    handlers: Array<(data: IWritePacketDTO<T>) => X>;
  }): void {}

  /**
   * @description Publish a message, this method will be used to "send" method
   * @example
   * // Must use this inside it plus your core business rules
   * const packet = this.assignPacketId(partialPacket);
   * this.routingMap.set(packet.replyId, callback);
   * */
  protected publish<Input, Output>(data: {
    partialPacket: IReadPacketDTO<Input, IMessageOptionsDTO>;
    callback: (packet: IWritePacketDTO<Output>) => void;
  }): () => void | undefined {}

  /**
   * @description Publish a message, this method will be used to "emit" method
   * */
  protected dispatchEvent<Input>(
    packet: IReadPacketDTO<Input, IMessageOptionsDTO>,
  ): Promise<unknown> {}
}
```