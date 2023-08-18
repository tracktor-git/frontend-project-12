import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

const FormInput = (props) => {
  const {
    formik, field, type, label, placeholder, autoFocus, isInvalid,
  } = props;

  return (
    <Form.Group className="form-floating mb-3">
      <FloatingLabel label={label} controlId={field}>
        <Form.Control
          type={type}
          name={field}
          autoComplete={field}
          isInvalid={isInvalid || (formik.touched[field] && formik.errors[field])}
          onChange={formik.handleChange}
          value={formik.values[field]}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required
        />
        {formik.errors[field] && <div className="invalid-tooltip">{formik.errors[field]}</div>}
      </FloatingLabel>
    </Form.Group>
  );
};

export default FormInput;
