import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalFooter = ({ handleModalHide, isDisabled, submitButtonVariant }) => {
  const { t } = useTranslation();
  const submitButtonText = submitButtonVariant === 'success'
    ? t('modals.sendButton')
    : t('modals.removeButton');

  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={handleModalHide} disabled={isDisabled}>
        {t('modals.cancelButton')}
      </Button>
      <Button variant={submitButtonVariant} name="form" type="submit" disabled={isDisabled}>
        {submitButtonText}
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
