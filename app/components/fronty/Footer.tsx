import React, { Fragment, HTMLAttributes, useContext } from 'react';
import { css, useTheme } from '@emotion/react';

import IntContext from '../../context/Internalization';
import { LocaleString } from '../../abstract/settings';
import Grid from '../basis/Grid';
import Container from '../basis/Container';
import List from '../basis/List';
import Item from '../basis/Item';
import Column from '../basis/Column';
import Linkp from '../basis/Linkp';

type SectionFooterProps = HTMLAttributes<HTMLDivElement> & {
  navigationLinks: { title: LocaleString, url: string }[],
};

const SectionFooter = ({ navigationLinks }: SectionFooterProps) => {
  const i18n = useContext(IntContext);
  const locale = i18n.locale();
  const { colors, mediaQueries } = useTheme();

  return (
    <>
      <footer
        css={css`
          padding: 30px 0;
          border-top: 1px solid ${colors.border};
        `}
      >
        <Container>
          <Grid
            cols={3}
          >
            <Column size={2} sizeXl={1}>
              <List>
                {navigationLinks.map((link, index, { length }) => (
                  <Fragment key={link.title[locale]}>
                    <Item>
                      <Linkp
                        href={link.url}
                        primaryColor={colors.mono}
                        css={css`
                          ${mediaQueries.md(`
                            display: block;
                            padding: 15px 0;
                            border-bottom: 1px solid ${colors.border};
                          `)}
                        `}
                      >
                        <span>{link.title[locale]}</span>
                      </Linkp>
                    </Item>
                    {
                      index < length - 1 && (
                        <Item
                          css={css`
                            margin: 0 15px;

                            ${mediaQueries.md(`
                              display: none;
                            `)}
                          `}
                        >
                          /
                        </Item>
                      )
                    }
                  </Fragment>
                ))}
              </List>
            </Column>
            <Column
              css={css`
                justify-self: end;

                ${mediaQueries.md(`
                  justify-self: center;
                  margin-top: 30px;
                `)}
              `}
            >
              <Linkp
                primaryColor={colors.mono}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                role="link"
                tabIndex={0}
                onKeyPress={() => {
                  window.scrollTo(0, 0);
                }}
              >
                {i18n.t('footer.on_top')}
              </Linkp>
            </Column>
          </Grid>
        </Container>
      </footer>
    </>
  );
};

export default SectionFooter;
