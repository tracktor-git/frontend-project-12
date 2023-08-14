import store from '../redux';
import SocketContext, { socket } from '../Contexts/SocketContext';
import { addChannel, renameChannel, removeChannel } from '../redux/slices/channelsSlice';
import { addMessage } from '../redux/slices/messagesSlice';

const { dispatch } = store;

socket.on('newMessage', (payload) => {
  dispatch(addMessage(payload));
});

socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});

socket.on('removeChannel', (payload) => {
  dispatch(removeChannel(payload));
});

socket.on('renameChannel', (payload) => {
  dispatch(renameChannel(payload));
});

const socketApi = {
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit('newMessage', message, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }),

  addChannel: (name) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit('newChannel', { name }, (error, payload) => {
      if (error) {
        reject(error);
      }
      resolve(payload);
    });
  }),

  renameChannel: ({ id, name }) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit('renameChannel', { id, name }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }),

  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit('removeChannel', { id }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }),
};

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socketApi}>
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
