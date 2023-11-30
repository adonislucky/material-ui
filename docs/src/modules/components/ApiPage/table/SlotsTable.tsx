/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { SlotsFormatedParams, getHash } from 'docs/src/modules/components/ApiPage/list/SlotsList';
import StyledTableContainer from 'docs/src/modules/components/ApiPage/table/StyledTableContainer';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .slot-name': {
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .class-name': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.8),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
    '& .item-default': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
    },
    '& .description-column': {
      width: '40%',
      paddingRight: 8,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .slot-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .class-name': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
      },
      '& .item-default': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-grey-900, ${darkTheme.palette.grey[900]})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
    },
  }),
);

interface SlotsTableProps {
  slots: SlotsFormatedParams[];
}

export default function SlotsTable(props: SlotsTableProps) {
  const { slots } = props;
  const t = useTranslate();

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>{t('api-docs.slotName')}</th>
            <th>{t('api-docs.className')}</th>
            <th>{t('api-docs.defaultComponent')}</th>
            <th>{t('api-docs.description')}</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((params) => {
            const { description, className, name, defaultValue, componentName } = params;

            return (
              <tr key={className} id={getHash({ componentName, className })}>
                <td className="slot-name" style={{ fontWeight: '600' }}>
                  {name}
                </td>
                <td className="MuiApi-table-class-name">
                  {className && <span className="class-name">{`.${className}`}</span>}
                </td>
                <td>{defaultValue && <code className="item-default">{defaultValue}</code>}</td>
                <td className="description-column">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description || '',
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}
