import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/slices/modalSlice';

const ModalForm = ({ formik, onSubmit }) => {
  const translate = useTranslation().t;
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  }, []);

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  return (
    <Form name="form" onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="input-group">
          <FloatingLabel label={translate('channels.channelName')} controlId="channelName">
            <Form.Control
              type="text"
              name="channelName"
              ref={inputRef}
              placeholder={translate('channels.channelName')}
              isInvalid={formik.errors.channelName}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              autoFocus
            />
            {formik.errors.channelName && <div className="invalid-tooltip">{formik.errors.channelName}</div>}
          </FloatingLabel>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalHide} disabled={formik.isSubmitting}>
          {translate('modals.cancelButton')}
        </Button>
        <Button name="form" type="submit" variant="success" disabled={formik.isSubmitting}>
          {translate('modals.sendButton')}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default ModalForm;
