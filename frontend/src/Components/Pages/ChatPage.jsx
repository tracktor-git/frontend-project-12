import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Channels from '../ChatComponents/Channels/Channels';
import Messages from '../ChatComponents/Messages/Messages';
import fetchData from '../../redux/fetchData';
import useAuth from '../../Hooks/useAuth';
import selectors from '../../redux/selectors';

const ChatPage = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;

  const status = useSelector(selectors.statusSelector);
  const { logOut, getAuthHeader } = useAuth();

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchData(authHeader))
      .unwrap()
      .catch((error) => {
        if (error.response?.statusText === 'Unauthorized') {
          toast.error(translate('errors.unauthorized'));
          logOut();
        } else {
          toast.error(translate('errors.dataLoadingError'));
        }
      });
  }, [dispatch, getAuthHeader, logOut, translate]);

  if (status === 'loading') {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Spinner className="tracktor-spinner" variant="secondary" animation="border">
            <span className="visually-hidden">{translate('loading')}</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </Container>
  );
};

export default ChatPage;
