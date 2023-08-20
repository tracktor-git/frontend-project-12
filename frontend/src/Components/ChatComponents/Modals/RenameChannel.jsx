import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../../redux/slices/modalSlice';
import SocketContext from '../../../Contexts/SocketContext.js';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';
import ModalForm from './ModalForm';
import getChannelNameSchema from './ChannelNameSchema';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useFilter();
  const socketApi = useContext(SocketContext);

  const isOpened = useSelector(selectors.modalIsOpenedSelector);
  const channelId = useSelector(selectors.modalChannelIdSelector);
  const channelName = useSelector(selectors.channelNameSelector);
  const channelNames = useSelector(selectors.channelsNamesSelector);

  const ChannelNameSchema = getChannelNameSchema(channelNames);

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: { channelName },
    validationSchema: ChannelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      formik.values.channelName = filter.clean(values.channelName);

      const renamedChannel = {
        id: channelId,
        name: values.channelName,
      };

      try {
        await ChannelNameSchema.validate({ channelName: values.channelName });
        await socketApi.renameChannel(renamedChannel);
        toast(t('channels.channelRenamed'));
        handleModalHide();
        formik.resetForm();
      } catch (error) {
        if (error instanceof ChannelNameSchema.ValidationError) {
          formik.setFieldError('channelName', error.message);
          return;
        }
        console.warn(error);
        toast.error(t('errors.dataLoadingError'));
      }
    },
  });

  return (
    <Modal show={isOpened} onHide={handleModalHide} centered animation>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <ModalForm onSubmit={formik.handleSubmit} formik={formik} />
    </Modal>
  );
};

export default RenameChannel;
