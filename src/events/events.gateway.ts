import { Global } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Global()
@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  emit(event: string, payload: unknown) {
    if (!this.server) return;
    this.server.emit(event, payload);
  }
}
