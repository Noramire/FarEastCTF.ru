import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { AppContext, AppProps } from 'next/app';
import rosetta from 'rosetta';
import { ThemeProvider } from '@emotion/react';

import WhiteTheme from '../app/themes/WhiteTheme';
import IntContext from '../app/context/Internalization';
import { Utils, Fronty } from '../app/components';
import enTranslation from '../assets/translations/en.json';
import ruTranslation from '../assets/translations/ru.json';

import 'normalize.css';
import '../styles/main.scss';

const { AppGlobal } = Fronty;
const { SmoothScroll } = Utils;

const App: NextPage<AppProps, AppContext> = ({
  Component,
  pageProps,
  router,
}) => {
  const i18n = useMemo(() => (
    rosetta({
      'en-US': enTranslation,
      'ru-RU': ruTranslation,
    })
  ), []);
  i18n.locale(router.locale);

  return (
    <>
      <IntContext.Provider value={i18n}>
        <ThemeProvider theme={WhiteTheme}>
          <AppGlobal />
          <SmoothScroll>
            <Component {...pageProps} />
          </SmoothScroll>
        </ThemeProvider>
      </IntContext.Provider>
    </>
  );
};

export default App;
