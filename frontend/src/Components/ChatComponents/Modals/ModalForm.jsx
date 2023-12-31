import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/slices/modalSlice';
import ModalFooter from './ModalFooter';

const ModalForm = ({ formik, onSubmit }) => {
  const { t } = useTranslation();
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

  const errorText = t(formik.errors.channelName);

  return (
    <Form name="form" onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="input-group">
          <FloatingLabel label={t('channels.channelName')} controlId="channelName">
            <Form.Control
              type="text"
              name="channelName"
              ref={inputRef}
              placeholder={t('channels.channelName')}
              isInvalid={errorText}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              autoFocus
            />
            {errorText && <div className="invalid-tooltip">{errorText}</div>}
          </FloatingLabel>
        </Form.Group>
      </Modal.Body>
      <ModalFooter handleModalHide={handleModalHide} isDisabled={formik.isSubmitting} submitButtonVariant="success" />
    </Form>
  );
};

export default ModalForm;
