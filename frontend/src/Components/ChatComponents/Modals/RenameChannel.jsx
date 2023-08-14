/* eslint-disable react-hooks/exhaustive-deps */

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
import SocketContext from '../../../Contexts/SocketContext.js';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;
  const filter = useFilter();
  const socketApi = useContext(SocketContext);
  const inputRef = useRef();

  const isOpened = useSelector(selectors.modalIsOpenedSelector);
  const channelId = useSelector(selectors.modalChannelIdSelector);
  const channelName = useSelector(selectors.channelNameSelector);
  const channelNames = useSelector(selectors.channelsNamesSelector);

  useEffect(() => {
    inputRef.current.select();
  }, [inputRef.current]);

  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .trim()
      .min(3, translate('errors.shouldHaveLength'))
      .max(20, translate('errors.shouldHaveLength'))
      .notOneOf(channelNames, translate('errors.shouldBeUniq'))
      .required(translate('errors.required')),
  });

  const handleModalHide = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: { channelName },
    validationSchema: ChannelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const renamedChannel = {
        id: channelId,
        name: values.channelName,
      };

      try {
        await socketApi.renameChannel(renamedChannel);
        toast(translate('channels.channelRenamed'));
        handleModalHide();
        formik.resetForm();
      } catch (error) {
        console.warn(error);
        toast.error(translate('errors.dataLoadingError'));
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
        <Modal.Title>{translate('modals.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Form name="form" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="input-group">
            <FloatingLabel label={translate('modals.channelName')} controlId="channelName">
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
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

export default RenameChannel;
