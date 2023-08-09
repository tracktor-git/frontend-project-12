import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import notFoundImage from '../../Images/404.svg';

const NotFoundPage = () => {
  const translate = useTranslation().t;

  return (
    <div className="text-center">
      <img alt={translate('pageNotFound')} className="img-fluid h-25" src={notFoundImage} />
      <h1 className="h4 text-muted" style={{ marginTop: '15px' }}>
        {translate('pageNotFound')}
      </h1>
      <p className="text-muted">
        {translate('youCanGo')}
        {' '}
        <Link to="/">{translate('toMainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
