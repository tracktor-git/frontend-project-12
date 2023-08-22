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
import ModalFooter from './ModalFooter';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socketApi = useContext(SocketContext);

  const channelId = useSelector(selectors.modalChannelIdSelector);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        await socketApi.removeChannel(channelId);
        toast(t('channels.channelRemoved'));
        dispatch(closeModal());
      } catch (error) {
        console.warn(error);
        toast.error(t('errors.dataLoadingError'));
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.areYouSure')}</Modal.Body>
      <Form name="form" onSubmit={formik.handleSubmit}>
        <ModalFooter handleModalHide={() => dispatch(closeModal())} isDisabled={formik.isSubmitting} submitButtonVariant="danger" />
      </Form>
    </>
  );
};

export default RemoveChannel;
