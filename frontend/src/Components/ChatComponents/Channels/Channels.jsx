import { Button, Nav } from 'react-bootstrap';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../../redux/slices/modalSlice.js';
import Channel from './Channel.jsx';
import ChatModal from '../Modals/ChatModal';
import selectors from '../../../redux/selectors.js';

const Channels = () => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;
  const channels = useSelector(selectors.channelsSelector);

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  return (
    <>
      <ChatModal />
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{translate('channels.channels')}</b>
          <Button
            title={translate('channels.addChannel')}
            variant="group-vertical"
            className="add-channel p-0 text-primary"
            onClick={handleOpenModal}
          >
            <FaRegSquarePlus size={20} color="rgb(85 133 124)" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" as="ul">
          {
            channels.map((channel) => <Channel key={channel.id} data={channel} />)
          }
        </Nav>
      </div>
    </>
  );
};

export default Channels;
