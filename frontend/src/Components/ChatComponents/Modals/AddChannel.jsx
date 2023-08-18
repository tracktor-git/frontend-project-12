import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../../redux/slices/modalSlice';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import SocketContext from '../../../Contexts/SocketContext.js';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';
import ModalForm from './ModalForm';

const AddChannel = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;
  const filter = useFilter();
  const socketApi = useContext(SocketContext);

  const isOpened = useSelector(selectors.modalIsOpenedSelector);
  const channelNames = useSelector(selectors.channelsNamesSelector);

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .trim()
      .min(3, translate('errors.shouldHaveLength'))
      .max(20, translate('errors.shouldHaveLength'))
      .notOneOf(channelNames, translate('errors.shouldBeUniq'))
      .required(translate('errors.required')),
  });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: ChannelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const response = await socketApi.addChannel(values.channelName);
        dispatch(setActiveChannel(response.data.id));
        toast(translate('channels.channelAdded'));
        handleModalHide();
        formik.resetForm();
      } catch (error) {
        toast.error(translate('errors.dataLoadingError'));
        console.warn(error);
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.values.channelName = filter.clean(formik.values.channelName);
    formik.handleSubmit();
  };

  return (
    <Modal show={isOpened} onHide={handleModalHide} centered animation>
      <Modal.Header closeButton>
        <Modal.Title>{translate('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <ModalForm onSubmit={handleSubmit} formik={formik} />
    </Modal>
  );
};

export default AddChannel;
