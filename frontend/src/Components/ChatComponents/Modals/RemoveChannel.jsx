import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { closeModal } from '../../../redux/slices/modalSlice';
import socket from '../../../socket';
import selectors from '../../../redux/selectors';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;

  const channelId = useSelector(selectors.modalChannelIdSelector);
  const isOpened = useSelector(selectors.modalIsOpenedSelector);

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      socket.emit('removeChannel', { id: channelId }, (payload) => {
        if (payload.error) {
          console.error(payload.error);
          toast(translate('errors.dataLoadingError'));
        } else {
          toast(translate('channels.channelRemoved'));
          handleModalHide();
        }
      });
    },
  });

  return (
    <Modal show={isOpened} onHide={handleModalHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translate('modals.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{translate('modals.areYouSure')}</Modal.Body>
      <Form name="form" onSubmit={formik.handleSubmit}>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalHide} disabled={formik.isSubmitting}>
            {translate('modals.cancelButton')}
          </Button>
          <Button name="form" type="submit" variant="danger" disabled={formik.isSubmitting}>
            {translate('modals.removeButton')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveChannel;
