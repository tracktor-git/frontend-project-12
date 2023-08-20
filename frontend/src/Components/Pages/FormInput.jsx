import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useTranslation } from 'react-i18next';

const FormInput = (props) => {
  const {
    formik,
    field,
    type,
    label,
    placeholder,
    autoFocus,
    isInvalid,
  } = props;

  const { t } = useTranslation();

  const errorText = t(formik.errors[field]);

  return (
    <Form.Group className="form-floating mb-3">
      <FloatingLabel label={label} controlId={field}>
        <Form.Control
          type={type}
          name={field}
          autoComplete={field}
          isInvalid={isInvalid || (formik.touched[field] && errorText)}
          onChange={formik.handleChange}
          value={formik.values[field]}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required
        />
        {errorText && <div className="invalid-tooltip">{errorText}</div>}
      </FloatingLabel>
    </Form.Group>
  );
};

export default FormInput;
