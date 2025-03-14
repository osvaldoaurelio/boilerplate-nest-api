import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit(event: string | symbol | (string | symbol)[], ...payload: any[]) {
    this.eventEmitter.emit(event, payload);
  }
}
