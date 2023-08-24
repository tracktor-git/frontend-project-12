import filter from 'leo-profanity';

const useFilter = () => {
  /* Adding double-lang support for filtering bad words */
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return filter;
};

export default useFilter;
