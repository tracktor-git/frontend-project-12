import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet />
    <ToastContainer />
  </div>
);

export default Layout;
