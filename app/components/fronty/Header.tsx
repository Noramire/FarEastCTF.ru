import React, { useContext, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import IntContext from '../../context/Internalization';
import { LocaleString } from '../../abstract/settings';
import Linkp from '../basis/Linkp';
import List from '../basis/List';
import Item from '../basis/Item';
import Button from '../basis/Button';

type HeaderProps = {
  navigationLinks: { title: LocaleString, url: string }[],
};

const Header = ({ navigationLinks }: HeaderProps) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();
  const router = useRouter();
  const currentLink = router.asPath;
  const { colors, mediaQueries } = useTheme();

  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <>
      <header
        css={css`
          border-bottom: 1px solid ${colors.border};
          display: flex;
          align-items: center;
          height: 106px;
        `}
      >
        <div
          css={css`
            padding: 35px 40px;
            width: 100%;
            display: flex;
            align-items: center;
          `}
        >
          <Linkp
            href="/"
            css={css`
              font-size: 24px;
              line-height: 1;
              font-family: 'RalewayBlack';
              letter-spacing: -1px;
            `}
            primaryColor={colors.dark}
          >
            {i18n.t('head.title.logo')}
          </Linkp>
          <div css={{ flexGrow: 1 }} />
          <List
            css={css`
              ${mediaQueries.md(`
                display: none;
              `)}
            `}
          >
            {navigationLinks.map((link, index) => (
              <Item
                key={link.title[locale]}
                css={css`
                  margin-right: 25px;
                `}
              >
                <Linkp
                  href={link.url}
                  css={css`
                    color: ${colors.dark};
                    text-transform: uppercase;
                    display: flex;
                    flex-flow: column;
                  `}
                >
                  <span
                    css={css`
                      color: ${colors.mono}; 
                    `}
                  >
                    {`0${index}`}
                  </span>
                  <span
                    css={css`
                      font-weight: bold;
                    `}
                  >
                    {link.title[locale]}
                  </span>
                </Linkp>
              </Item>
            ))}
          </List>
        </div>
        <Button
          onClick={() => { setDropdownMenu((v) => !v); }}
          css={css`
            padding: 53px 50px 53px 30px;
            position: relative;
            z-index: 100;
            display: none;

            ${mediaQueries.md(`
              display: block;
            `)}
          `}
        />
        <div
          css={css`
            font-size: 12px;
            padding: 46px 40px;
              
            border-left: 1px solid ${colors.border};

            ${mediaQueries.md(`
              display: none;
            `)}
          `}
        >
          <Linkp
            href={currentLink}
            locale="ru-RU"
            primaryColor={colors.dark}
            css={css`
              ${locale == 'ru-RU' && 'font-weight: bold;'}
            `}
          >
            RU
          </Linkp>
          <span css={{ margin: '0 10px' }}>|</span>
          <Linkp
            href={currentLink}
            locale="en-US"
            primaryColor={colors.dark}
            css={css`
              ${locale == 'en-US' && 'font-weight: bold;'}
            `}
          >
            EN
          </Linkp>
        </div>
        <AnimatePresence>
          {dropdownMenu && (
            <motion.div
              css={css`
                position: absolute;
                top: 0; left: 0;
                width: 100vw;
                background: ${colors.white};
                z-index: 99;
                border-bottom: 1px solid ${colors.border};
              `}
              initial={{ opacity: 0, height: '0vh' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: '0vh' }}
              transition={{
                ease: 'easeOut',
                duration: 0.5,
              }}
            >
              <List
                css={css`
                  padding: 50px 5%;
                  font-size: 25px;
                `}
              >
                {navigationLinks.map((link, index) => (
                  <Item
                    key={link.title[locale]}
                    css={css`
                      margin-bottom: 15px;
                    `}
                  >
                    <Linkp
                      href={link.url}
                      css={css`
                        color: ${colors.dark};
                        text-transform: uppercase;
                        display: flex;
                        flex-flow: column;
                      `}
                    >
                      <span
                        css={css`
                          color: ${colors.mono}; 
                        `}
                      >
                        {`0${index}`}
                      </span>
                      <span
                        css={css`
                          font-weight: bold;
                        `}
                      >
                        {link.title[locale]}
                      </span>
                    </Linkp>
                  </Item>
                ))}
                <Item>
                  <div
                    css={css`
                      margin-top: 40px;
                    `}
                  >
                    <Linkp
                      href={currentLink}
                      locale="ru-RU"
                      primaryColor={colors.dark}
                      css={css`
                        ${locale == 'ru-RU' && 'font-weight: bold;'}
                      `}
                    >
                      RU
                    </Linkp>
                    <span css={{ margin: '0 10px' }}>|</span>
                    <Linkp
                      href={currentLink}
                      locale="en-US"
                      primaryColor={colors.dark}
                      css={css`
                        ${locale == 'en-US' && 'font-weight: bold;'}
                      `}
                    >
                      EN
                    </Linkp>
                  </div>
                </Item>
              </List>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
