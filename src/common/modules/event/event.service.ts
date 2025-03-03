import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventType } from './event.type';

@Injectable()
export class EventService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<T>(event: EventType, payload: T) {
    this.eventEmitter.emit(event, payload);
  }
}
