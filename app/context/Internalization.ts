import { createContext } from 'react';
import rosetta from 'rosetta';
import enTranslation from '../../assets/translations/en.json';
import ruTranslation from '../../assets/translations/ru.json';

const i18n = rosetta({
  'en-US': enTranslation,
  'ru-RU': ruTranslation,
});

const IntContext = createContext(i18n);

export default IntContext;
