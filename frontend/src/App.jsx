import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Components/Pages/ChatPage';
import LoginPage from './Components/Pages/LoginPage';
import Layout from './Components/Layout';
import NotFoundPage from './Components/Pages/NotFoundPage';
import SignupPage from './Components/Pages/SignupPage';
import AuthRequire from './Hocs/AuthRequire';
import AuthProvider from './Hocs/AuthProvider';
import routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.chatPagePath()} element={<Layout />}>
          <Route index element={<AuthRequire><ChatPage /></AuthRequire>} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
