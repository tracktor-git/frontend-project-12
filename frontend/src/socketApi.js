export default (socket) => ({
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
});
