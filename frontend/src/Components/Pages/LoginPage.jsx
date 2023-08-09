import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import routes from '../../routes';

import loginImage from '../../Images/login.svg';

const LoginPage = () => {
  const [errorText, setErrorText] = useState(null);
  const { logIn, loggedIn } = useAuth();

  const translate = useTranslation().t;

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setErrorText(null);
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        logIn();
      } catch (error) {
        if (error.message === 'Network Error') {
          toast.error(translate('errors.networkError'));
        } else {
          console.error(error);
          setErrorText(translate('errors.wrongAuthData'));
        }
      }
    },
  });

  if (loggedIn) {
    return <Navigate to={routes.chatPagePath()} />;
  }

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img style={{ pointerEvents: 'none' }} src={loginImage} className="roundedCircle" alt="Login" width="250px" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{translate('login')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('nickname')}>
                      <Form.Control
                        className={errorText && 'is-invalid'}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('nickname')}
                        name="username"
                        id="username"
                        required
                        autoFocus
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('password')}>
                      <Form.Control
                        className={errorText && 'is-invalid'}
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('password')}
                        name="password"
                        id="password"
                        required
                      />
                      {errorText && <div className="invalid-tooltip">{errorText}</div>}
                    </FloatingLabel>
                  </Form.Group>
                  <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">
                    {translate('loginButton')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{translate('noAccount')}</span>
                {' '}
                <Link to={routes.signupPagePath()}>{translate('register')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
