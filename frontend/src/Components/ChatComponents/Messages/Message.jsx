import useAuth from '../../../Hooks/useAuth';

const Message = ({ message }) => {
  const { user } = useAuth();
  const { id, username, body } = message;
  const localUserName = user.username;
  const myMessageClassName = localUserName === username ? 'my-message' : '';
  const classNames = `text-break mb-2 message ${myMessageClassName}`;

  return (
    <div className={classNames} key={id}>
      <span><b>{`${username}: `}</b></span>
      <span>{body}</span>
    </div>
  );
};

export default Message;
