import { createSelector } from 'reselect';

const currentChannelIdSelector = ({ channelsSlice }) => channelsSlice.currentChannelId;

const channelsSelector = ({ channelsSlice }) => channelsSlice.channels;

const getCurrentMessages = (state) => state.messagesSlice.messages
  .filter((message) => message.channelId === state.channelsSlice.currentChannelId);

const messagesSelector = createSelector(getCurrentMessages, (messages) => messages);

const currentChannelNameSelector = (state) => {
  const currentChannel = state.channelsSlice.channels
    .find((channel) => channel.id === state.channelsSlice.currentChannelId) ?? { name: '' };
  return currentChannel.name;
};

const modalIsOpenedSelector = ({ modalSlice }) => modalSlice.isOpened;

const channelsNamesSelector = createSelector(
  channelsSelector,
  (channels) => channels.map(({ name }) => name),
);

const modalTypeSelector = (state) => state.modalSlice.type;

const modalChannelIdSelector = ({ modalSlice }) => modalSlice.data.channelId;

const channelNameSelector = (state) => state.channelsSlice.channels
  .find((channel) => channel.id === state.modalSlice.data.channelId)
  .name;

const statusSelector = (state) => state.channelsSlice.status;

export default {
  currentChannelIdSelector,
  channelsSelector,
  messagesSelector,
  currentChannelNameSelector,
  modalIsOpenedSelector,
  channelsNamesSelector,
  modalTypeSelector,
  modalChannelIdSelector,
  channelNameSelector,
  statusSelector,
};
