import { Button, Nav } from 'react-bootstrap';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { openModal } from '../../../redux/slices/modalSlice.js';
import Channel from './Channel.jsx';
import ChatModal from '../Modals/ChatModal';
import selectors from '../../../redux/selectors.js';

const scrollToCurrentChannel = (element) => {
  element?.scrollIntoView({ behavior: 'smooth' });
};

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.channelsSelector);
  const currentChannelId = useSelector(selectors.currentChannelIdSelector);
  const channelRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (currentChannelId) scrollToCurrentChannel(channelRef.current);
    }, 0);
  }, [currentChannelId]);

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  return (
    <>
      <ChatModal />
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <Button
            title={t('channels.addChannel')}
            variant="group-vertical"
            className="add-channel p-0 text-primary"
            onClick={handleOpenModal}
          >
            <FaRegSquarePlus size={20} color="rgb(85 133 124)" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {
            channels.map((data) => (
              <Channel
                key={data.id}
                data={data}
                isCurrent={data.id === currentChannelId}
                setRef={data.id === currentChannelId ? channelRef : null}
              />
            ))
          }
        </Nav>
      </div>
    </>
  );
};

export default Channels;
