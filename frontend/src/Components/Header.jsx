import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../Hooks/useAuth';
import routes from '../routes';

const Header = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPagePath}>
          {t('chatTitle')}
        </Navbar.Brand>
        {loggedIn && <Button variant="secondary" onClick={logOut}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
