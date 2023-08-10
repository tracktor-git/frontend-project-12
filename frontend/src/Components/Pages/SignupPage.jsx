import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import routes from '../../routes';

import signupImage from '../../Images/signup.svg';

const SignupPage = () => {
  const { logIn, loggedIn } = useAuth();
  const [errorText, setErrorText] = useState(null);
  const translate = useTranslation().t;

  const SignupSchema = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .min(3, translate('errors.shouldHaveLength'))
      .max(20, translate('errors.shouldHaveLength'))
      .required(translate('errors.required')),
    password: Yup
      .string()
      .required(translate('errors.required'))
      .min(6, translate('errors.shouldHaveMinLength')),
    passwordConfirm: Yup
      .string()
      .when('password', (password, field) => password && field.oneOf([Yup.ref('password')], translate('errors.passwordsShouldBeEqual'))),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setErrorText(null);
      const { username, password } = values;
      try {
        const response = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('user', JSON.stringify({ username: response.data.username, token: response.data.token }));
        logIn();
      } catch (error) {
        if (error.message === 'Network Error') {
          toast.error(translate('errors.networkError'));
          console.error(error.message);
        } else if (error.response.data.message === 'Conflict') {
          setErrorText(translate('errors.userConflict'));
        } else {
          setErrorText(error.message);
        }
      }
    },
  });

  if (loggedIn) {
    return <Navigate to={routes.chatPagePath()} />;
  }

  const showError = (field) => {
    if (formik.touched[field] && formik.errors[field]) {
      return <div className="invalid-tooltip">{formik.errors[field]}</div>;
    }
    if (errorText) {
      return <div className="invalid-tooltip">{errorText}</div>;
    }
    return false;
  };

  const getClassName = (field) => {
    if (errorText) {
      return 'is-invalid';
    }
    if (formik.touched[field] && formik.errors[field]) {
      return 'is-invalid';
    }
    return null;
  };

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img style={{ pointerEvents: 'none' }} src={signupImage} className="roundedCircle" alt="Login" width="250px" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{translate('register')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('username')}>
                      <Form.Control
                        className={getClassName('username')}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('username')}
                        name="username"
                        id="username"
                        required
                        autoFocus
                      />
                      {showError('username')}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('password')}>
                      <Form.Control
                        className={getClassName('password')}
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
                      {showError('password')}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('passwordConfirm')}>
                      <Form.Control
                        className={getClassName('passwordConfirm')}
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirm}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('passwordConfirm')}
                        name="passwordConfirm"
                        id="passwordConfirm"
                        required
                      />
                      {showError('passwordConfirm')}
                    </FloatingLabel>
                  </Form.Group>
                  <Button type="submit" disabled={formik.isSubmitting} variant="outline-success" className="w-100 mb-3">
                    {translate('getRegistered')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{translate('haveAccount')}</span>
                {' '}
                <Link to={routes.loginPagePath()}>{translate('login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
