import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { closeModal } from '../../../redux/slices/modalSlice';
import SocketContext from '../../../Contexts/SocketContext.js';
import selectors from '../../../redux/selectors';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;
  const socketApi = useContext(SocketContext);

  const channelId = useSelector(selectors.modalChannelIdSelector);
  const isOpened = useSelector(selectors.modalIsOpenedSelector);

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        await socketApi.removeChannel(channelId);
        toast(translate('channels.channelRemoved'));
        handleModalHide();
      } catch (error) {
        console.warn(error);
        toast.error(translate('errors.dataLoadingError'));
      }
    },
  });

  return (
    <Modal show={isOpened} onHide={handleModalHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translate('channels.removeChannelTitle')}</Modal.Title>
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
