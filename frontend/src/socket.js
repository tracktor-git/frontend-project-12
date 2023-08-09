import { io } from 'socket.io-client';
import store from './redux';
import { addChannel, renameChannel, removeChannel } from './redux/slices/channelsSlice';
import { addMessage } from './redux/slices/messagesSlice';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:3000';
const { dispatch } = store;

const socket = io(URL, {
  autoConnect: true,
});

const onNewMessage = (payload) => {
  dispatch(addMessage(payload));
};

const onNewChannel = (payload) => {
  dispatch(addChannel(payload));
};

const onRemoveChannel = (payload) => {
  dispatch(removeChannel(payload));
};

const onRenameChannel = (payload) => {
  dispatch(renameChannel(payload));
};

socket.on('newMessage', onNewMessage);
socket.on('newChannel', onNewChannel);
socket.on('removeChannel', onRemoveChannel);
socket.on('renameChannel', onRenameChannel);

export default socket;
