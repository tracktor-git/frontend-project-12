import filter from 'leo-profanity';

/* Adding double-lang support for filtering bad words */
filter.clearList();
filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const useFilter = () => filter;

export default useFilter;
