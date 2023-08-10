import { Form, Button } from 'react-bootstrap';
import { IoSendSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Message from './Message.jsx';
import selectors from '../../../redux/selectors.js';
import useAuth from '../../../Hooks/useAuth';
import useFilter from '../../../Hooks/useFilter';
import socket from '../../../socket.js';

const scrollToBottom = (element) => {
  element.scrollTo(0, element.scrollHeight);
};

const Messages = () => {
  const messagesBoxRef = useRef();
  const messageInputRef = useRef();
  const translate = useTranslation().t;
  const filter = useFilter();

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

  const MessageSchema = Yup.object().shape({
    body: Yup.string().trim().min(1).required(),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: MessageSchema,
    onSubmit: (values) => {
      const newMessage = {
        body: filter.clean(values.body),
        channelId: currentChannelId,
        username,
      };

      socket.emit('newMessage', newMessage, (payload) => {
        if (payload.error) {
          console.error(payload.error);
          toast(translate('errors.dataLoadingError'));
        } else {
          formik.resetForm();
        }
      });
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{`${messages.length} ${translate('messages.count', { count: messages.length })}`}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {
            messages.map((message) => <Message message={message} key={message.id} />)
          }
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="input-group">
              <Form.Control
                ref={messageInputRef}
                id="body"
                name="body"
                aria-label={translate('messages.newMessage')}
                placeholder={translate('messages.enterMessage')}
                className="border-0 p-0 ps-2"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.body}
                disabled={formik.isSubmitting}
                autoFocus
              />
              <span title={translate('messages.sendMessage')}>
                <Button
                  style={{ border: 'none' }}
                  variant="group-vertical"
                  type="submit"
                  disabled={formik.isSubmitting || !formik.values.body.trim()}
                  onClick={formik.handleSubmit}
                >
                  <IoSendSharp size={20} color="rgb(85 133 124)" />
                  <span className="visually-hidden">{translate('messages.sendMessage')}</span>
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
