import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18next from 'i18next';
import SocketProvider from './Hocs/SocketProvider';
import App from './App';
import resources from './locales';
import rollbarConfig from './rollbar';
import store from './redux';

const Init = async () => {
  const i18n = i18next.createInstance();

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
            <SocketProvider>
              <App />
            </SocketProvider>
          </ReduxProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
