import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { io } from 'socket.io-client';
import { addChannel, renameChannel, removeChannel } from './redux/slices/channelsSlice';
import { addMessage } from './redux/slices/messagesSlice';
import App from './App';
import resources from './locales';
import rollbarConfig from './rollbar';
import store from './redux';
import SocketContext from './Contexts/SocketContext';
import getSocketApi from './socketApi';

const Init = async () => {
  const SOCKET_URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:3000';
  const socket = io.connect(SOCKET_URL);
  const socketApi = getSocketApi(socket);
  const i18n = i18next.createInstance();
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

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider>
          <ReduxProvider store={store}>
            <SocketContext.Provider value={socketApi}>
              <App />
            </SocketContext.Provider>
          </ReduxProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
