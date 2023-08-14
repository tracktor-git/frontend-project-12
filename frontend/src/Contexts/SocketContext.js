import { io } from 'socket.io-client';
import { createContext } from 'react';

const SOCKET_URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:3000';
const socket = io.connect(SOCKET_URL);
const SocketContext = createContext();

export { socket };
export default SocketContext;
