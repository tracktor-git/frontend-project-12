import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import notFoundImage from '../../Images/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('pageNotFound')} className="img-fluid h-25" src={notFoundImage} />
      <h1 className="h4 text-muted" style={{ marginTop: '15px' }}>
        {t('pageNotFound')}
      </h1>
      <div className="d-flex justify-content-center gap-1 text-muted">
        {t('youCanGo')}
        <Link to="/">{t('toMainPage')}</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
