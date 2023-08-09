import { useSelector } from 'react-redux';
import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import selectors from '../../../redux/selectors';

const modalTypes = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

const setModalType = (type) => modalTypes[type];

const ChatModal = () => {
  const type = useSelector(selectors.modalTypeSelector);
  const CurrentModal = setModalType(type);

  return type && <CurrentModal />;
};

export default ChatModal;
