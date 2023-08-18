import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/Row';
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

  const handleError = (error, formikErrors) => {
    console.error(error);
    switch (error.code) {
      case 'ERR_BAD_REQUEST':
        formikErrors.username = translate('errors.userConflict');
        break;
      case 'ERR_NETWORK':
        toast.error(translate('errors.networkError'));
        break;
      default:
        toast.error(error.message);
        break;
    }
  };

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const response = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('user', JSON.stringify({ username: response.data.username, token: response.data.token }));
        logIn();
      } catch (error) {
        handleError(error, formik.errors);
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
                <img style={{ pointerEvents: 'none' }} src={signupImage} className="roundedCircle" alt="Login" width="250px" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{translate('register')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('username')} controlId="username">
                      <Form.Control
                        type="text"
                        name="username"
                        autoComplete="username"
                        isInvalid={formik.touched.username && formik.errors.username}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('errors.shouldHaveLength')}
                        required
                        autoFocus
                      />
                      {formik.errors && <div className="invalid-tooltip">{formik.errors.username}</div>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('password')} controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        isInvalid={formik.touched.password && formik.errors.password}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('errors.shouldHaveMinLength')}
                        required
                      />
                      {formik.errors && <div className="invalid-tooltip">{formik.errors.password}</div>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={translate('passwordConfirm')} controlId="passwordConfirm">
                      <Form.Control
                        type="password"
                        name="passwordConfirm"
                        isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirm}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder={translate('errors.passwordsShouldBeEqual')}
                        required
                      />
                      {formik.errors && <div className="invalid-tooltip">{formik.errors.passwordConfirm}</div>}
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
