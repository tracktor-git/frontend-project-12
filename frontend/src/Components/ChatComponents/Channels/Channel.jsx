import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import { openModal } from '../../../redux/slices/modalSlice';

const Channel = ({ data, isCurrent, setRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const buttonVariant = isCurrent ? 'secondary' : 'text-start';

  const handleChannelClick = () => {
    dispatch(setActiveChannel(data.id));
  };

  const handleRemoveChannel = () => {
    dispatch(openModal({ type: 'removeChannel', data: { channelId: data.id } }));
  };

  const handleRenameChannel = () => {
    dispatch(openModal({ type: 'renameChannel', data: { channelId: data.id } }));
  };

  return (
    <Nav.Item className="channel w-100" ref={setRef}>
      <Dropdown className="d-flex btn-group">
        <Button variant={buttonVariant} className="w-100 rounded-0 text-start btn text-truncate" onClick={handleChannelClick}>
          <span className="me-1">{`# ${data.name}`}</span>
        </Button>
        {data.removable && (
          <Dropdown.Toggle variant={buttonVariant} className="flex-grow-0 dropdown-toggle-split">
            <span className="visually-hidden">{t('channels.channelControl')}</span>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveChannel}>{t('channels.removeChannelButton')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRenameChannel}>{t('channels.renameChannelButton')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Toggle>
        )}
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
