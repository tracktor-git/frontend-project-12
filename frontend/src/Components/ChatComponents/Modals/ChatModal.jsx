import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/slices/modalSlice';
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
  const dispatch = useDispatch();

  const isOpened = useSelector(selectors.modalIsOpenedSelector);
  const type = useSelector(selectors.modalTypeSelector);

  const CurrentModal = setModalType(type);

  return (
    <Modal show={isOpened} onHide={() => dispatch(closeModal())} restoreFocus={type === 'addChannel'} centered>
      {type && <CurrentModal />}
    </Modal>
  );
};

export default ChatModal;
