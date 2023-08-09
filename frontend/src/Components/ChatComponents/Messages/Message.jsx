const Message = ({ message }) => {
  const { id, username, body } = message;
  return (
    <div className="text-break mb-2" key={id}>
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  );
};

export default Message;
