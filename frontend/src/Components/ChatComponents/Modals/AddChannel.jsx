import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../../redux/slices/modalSlice';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import SocketContext from '../../../Contexts/SocketContext.js';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';

const AddChannel = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;
  const filter = useFilter();
  const socketApi = useContext(SocketContext);

  const isOpened = useSelector(selectors.modalIsOpenedSelector);
  const channelNames = useSelector(selectors.channelsNamesSelector);

  const inputRef = useRef();

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    inputRef.current.focus();
  });

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
    <Modal show={isOpened} onHide={handleModalHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translate('modals.addChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Form name="form" onSubmit={handleSubmit}>
        <Form.Group className="input-group" />
        <Modal.Body>
          <Form.Group className="input-group">
            <FloatingLabel label={translate('modals.channelName')}>
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
                id="channelName"
                placeholder={translate('modals.channelName')}
                className={formik.errors.channelName && 'is-invalid'}
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
    </Modal>
  );
};

export default AddChannel;
