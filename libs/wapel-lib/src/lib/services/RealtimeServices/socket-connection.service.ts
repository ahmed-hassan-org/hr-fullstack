import { Injectable } from '@angular/core';
import { SocketGeneralEvents } from '@microSharedLib/core/models/enum/socket/SocketGeneralEvents.enum';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketConnectionService {
  serMessage: Subject<any> = new Subject<any>();

  constructor(private socket: Socket) {}

  /**
   * @description event that come when any client susscfuly connected to our server
   * @returns void
   */
  public doConnect(): Observable<any> {
    return this.socket.fromEvent<any>(SocketGeneralEvents.SOCKET_CONNECT);
  }

  /** @description after disconnect from server */
  public afterConnection() {
    return this.socket.fromEvent(SocketGeneralEvents.SOCKET_AFTER_CONNECT);
  }
  /**
   * @description send get notification event from client
   * @event `newClientMessage`
   */
  public getNotificationFromServer(data: any) {
    return this.socket.emit(SocketGeneralEvents.SEND_CLIENT_MESSAGE, {
      ...data,
    });
  }

  /** @description recive notification from server
   * @event `serverMessage`
   */
  public reciveNotificationFromServer() {
    return this.socket.fromEvent<any>(SocketGeneralEvents.RECIVE_SERVER_MESSAGE);
  }

  /** @description close Socket connection */
  public closeSocket() {
    this.socket.emit(SocketGeneralEvents.SOCKET_DISCONNECT);
    this.socket.removeAllListeners();
  }
}
