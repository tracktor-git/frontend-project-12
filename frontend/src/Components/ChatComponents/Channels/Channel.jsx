import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import { openModal } from '../../../redux/slices/modalSlice';
import selectors from '../../../redux/selectors';

const Channel = ({ data }) => {
  const dispatch = useDispatch();
  const translate = useTranslation().t;

  const currentChannelId = useSelector(selectors.currentChannelIdSelector);

  const handleChannelClick = () => {
    dispatch(setActiveChannel(data.id));
  };

  const handleRemoveChannel = () => {
    dispatch(openModal({ type: 'removeChannel', data: { channelId: data.id } }));
  };

  const handleRnameChannel = () => {
    dispatch(openModal({ type: 'renameChannel', data: { channelId: data.id } }));
  };

  const variant = data.id === currentChannelId ? 'secondary' : 'text-start';

  return (
    <Nav.Item className="channel w-100" as="li">
      <Dropdown className="d-flex btn-group">
        <Button variant={variant} className="w-100 rounded-0 text-start btn text-truncate" onClick={handleChannelClick}>
          <span className="me-1">{`# ${data.name}`}</span>
        </Button>
        {data.removable && (
          <Dropdown.Toggle variant={variant} className="flex-grow-0 dropdown-toggle-split">
            <span className="visually-hidden">Toggle</span>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveChannel}>{translate('channels.removeChannel')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRnameChannel}>{translate('channels.renameChannel')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Toggle>
        )}
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
