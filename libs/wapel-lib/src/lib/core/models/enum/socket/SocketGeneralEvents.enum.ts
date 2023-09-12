export enum SocketGeneralEvents {
  SOCKET_CONNECT = 'connection',
  SOCKET_AFTER_CONNECT = 'after-connection',
  SOCKET_DISCONNECT = 'disconnection',
  /**  event fire when `new message` recived from client */
  SEND_CLIENT_MESSAGE = 'new-client-message',
  /** event fire to send message again to users */
  RECIVE_SERVER_MESSAGE = 'new-server-message',
}
