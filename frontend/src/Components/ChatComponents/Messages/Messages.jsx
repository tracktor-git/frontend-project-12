import { Form, Button } from 'react-bootstrap';
import { IoSendSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import SocketContext from '../../../Contexts/SocketContext.js';
import Message from './Message.jsx';
import selectors from '../../../redux/selectors.js';
import useAuth from '../../../Hooks/useAuth';
import useFilter from '../../../Hooks/useFilter';

const scrollToBottom = (element) => {
  element.scrollTo(0, element.scrollHeight);
};

const MessageSchema = Yup.object().shape({
  body: Yup.string().trim().min(1).required(),
});

const Messages = () => {
  const { t } = useTranslation();
  const messagesBoxRef = useRef();
  const messageInputRef = useRef();
  const filter = useFilter();
  const socketApi = useContext(SocketContext);

  const currentChannelId = useSelector(selectors.currentChannelIdSelector);
  const currentChannelName = useSelector(selectors.currentChannelNameSelector);
  const messages = useSelector(selectors.messagesSelector);

  const { username } = useAuth().user;

  useEffect(() => {
    messageInputRef.current.focus();
  });

  useEffect(() => {
    scrollToBottom(messagesBoxRef.current);
  }, [messages]);

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: MessageSchema,
    onSubmit: async (values) => {
      const newMessage = {
        body: filter.clean(values.body),
        channelId: currentChannelId,
        username,
      };

      try {
        await socketApi.sendMessage(newMessage);
        formik.resetForm();
      } catch (error) {
        toast.error(t('errors.dataLoadingError'));
        console.warn(error);
      }
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{`${messages.length} ${t('messages.count', { count: messages.length })}`}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {
            messages.map((message) => <Message message={message} key={message.id} />)
          }
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Form.Group className="input-group">
              <Form.Control
                id="body"
                name="body"
                className="border-0 p-0 ps-2"
                autoComplete="off"
                ref={messageInputRef}
                aria-label={t('messages.newMessage')}
                placeholder={t('messages.enterMessage')}
                onChange={formik.handleChange}
                value={formik.values.body}
                disabled={formik.isSubmitting}
                autoFocus
              />
              <span title={t('messages.sendMessage')}>
                <Button
                  type="submit"
                  variant="group-vertical"
                  style={{ border: 'none' }}
                  disabled={formik.isSubmitting || !formik.values.body.trim()}
                  onClick={formik.handleSubmit}
                >
                  <IoSendSharp size={20} color="rgb(85 133 124)" />
                  <span className="visually-hidden">{t('messages.sendMessage')}</span>
                </Button>
              </span>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
