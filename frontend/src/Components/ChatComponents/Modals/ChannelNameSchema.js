import * as Yup from 'yup';

export default (channelNames) => {
  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .trim()
      .min(3, 'errors.shouldHaveLength')
      .max(20, 'errors.shouldHaveLength')
      .notOneOf(channelNames, 'errors.shouldBeUniq')
      .required('errors.required'),
  });

  return ChannelNameSchema;
};
