import * as React from 'react';
import { FormControl, FormControlState } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';

export default function FormControlFunctionChild() {
  return (
    <FormControl defaultValue="" required>
      {({ filled, focused }: FormControlState) => (
        <React.Fragment>
          <StyledInput className={filled ? 'filled' : ''} />
          {filled && !focused && <OkMark>✔</OkMark>}
        </React.Fragment>
      )}
    </FormControl>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `
  display: inline-block;

  .${inputClasses.input} {
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }

  &.filled .${inputClasses.input} {
    box-shadow: 0 0 2px 2px rgba(125, 200, 0, 0.25);
  }
`,
);

const OkMark = styled('span')`
  margin-left: 8px;
  margin-top: 10px;
  position: absolute;
  color: rgb(125 200 0 / 1);
`;

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};
