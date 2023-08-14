import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance, fireEvent } from 'test/utils';
import FormControl from '@mui/material/FormControl';
import { inputBaseClasses } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import TextField, { textFieldClasses as classes } from '@mui/material/TextField';

describe('<TextField />', () => {
  const { render } = createRenderer();

  describeConformance(<TextField variant="standard" />, () => ({
    classes,
    inheritComponent: FormControl,
    render,
    muiName: 'MuiTextField',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('structure', () => {
    it('should have an input as the only child', () => {
      const { getAllByRole } = render(<TextField variant="standard" />);

      expect(getAllByRole('textbox')).to.have.lengthOf(1);
    });

    it('should forward the multiline prop to Input', () => {
      const { getByRole } = render(<TextField variant="standard" multiline />);

      expect(getByRole('textbox', { hidden: false })).to.have.class(
        inputBaseClasses.inputMultiline,
      );
    });

    it('should forward the fullWidth prop to Input', () => {
      const { getByTestId } = render(
        <TextField
          variant="standard"
          fullWidth
          InputProps={{ 'data-testid': 'mui-input-base-root' }}
        />,
      );

      expect(getByTestId('mui-input-base-root')).to.have.class(inputBaseClasses.fullWidth);
    });
  });

  describe('with a label', () => {
    it('label the input', () => {
      const { getByRole } = render(<TextField label="Foo bar" variant="standard" />);

      expect(getByRole('textbox')).toHaveAccessibleName('Foo bar');
    });

    it('should apply the className to the label', () => {
      const { container } = render(
        <TextField label="Foo bar" InputLabelProps={{ className: 'foo' }} variant="standard" />,
      );

      expect(container.querySelector('label')).to.have.class('foo');
    });

    ['', undefined].forEach((label) => {
      it(`should not render empty (${label}) label element`, () => {
        const { container } = render(<TextField label={label} variant="standard" />);

        expect(container.querySelector('label')).to.equal(null);
      });
    });
  });

  describe('with a helper text', () => {
    it('should apply the className to the FormHelperText', () => {
      const { getDescriptionOf, getByRole } = render(
        <TextField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(getDescriptionOf(getByRole('textbox'))).to.have.class('foo');
    });

    it('has an accessible description', () => {
      const { getByRole } = render(
        <TextField
          helperText="Foo bar"
          FormHelperTextProps={{ className: 'foo' }}
          variant="standard"
        />,
      );

      expect(getByRole('textbox')).toHaveAccessibleDescription('Foo bar');
    });
  });

  describe('with an outline', () => {
    it('should set outline props', () => {
      const { container, getAllByTestId } = render(
        <TextField
          InputProps={{ classes: { notchedOutline: 'notch' } }}
          label={<div data-testid="label">label</div>}
          required
        />,
      );

      const [, fakeLabel] = getAllByTestId('label');
      const notch = container.querySelector('.notch legend');
      expect(notch).to.contain(fakeLabel);
      expect(notch).to.have.text('label\u2009*');
    });

    it('should set shrink prop on outline from label', () => {
      const { container } = render(<TextField InputLabelProps={{ shrink: true }} classes={{}} />);

      expect(container.querySelector('fieldset')).to.have.class(
        outlinedInputClasses.notchedOutline,
      );
    });
    it('should render `0` label properly', () => {
      const { container } = render(
        <TextField InputProps={{ classes: { notchedOutline: 'notch' } }} label={0} required />,
      );

      const notch = container.querySelector('.notch legend');
      expect(notch).to.have.text('0\u2009*');
    });

    it('should not set padding for empty, null or undefined label props', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const spanStyle = { paddingLeft: '0px', paddingRight: '0px' };
      ['', undefined, null].forEach((prop) => {
        const { container: container1 } = render(
          <TextField InputProps={{ classes: { notchedOutline: 'notch' } }} label={prop} />,
        );
        expect(container1.querySelector('span')).toHaveComputedStyle(spanStyle);
      });
    });
  });

  describe('prop: InputProps', () => {
    it('should apply additional props to the Input component', () => {
      const { getByTestId } = render(
        <TextField InputProps={{ 'data-testid': 'InputComponent' }} variant="standard" />,
      );

      expect(getByTestId('InputComponent')).not.to.equal(null);
    });
  });

  describe('prop: disabled', () => {
    it('should not run click event when disabled', () => {
      const handleClick = spy();
      const { getByRole } = render(<TextField disabled onClick={handleClick} />);
      fireEvent.click(getByRole('textbox'));
      expect(handleClick.callCount).to.equal(0);
    });

    it('should not run click event when disabled and when onClick prop is set through InputProps', () => {
      const handleClick = spy();
      const { getByRole } = render(<TextField disabled InputProps={{ onClick: handleClick }} />);
      fireEvent.click(getByRole('textbox'));
      expect(handleClick.callCount).to.equal(0);
    });
  });

  describe('prop: select', () => {
    it('can render a <select /> when `native`', () => {
      const currencies = [
        { value: 'USD', label: '$' },
        { value: 'BTC', label: '฿' },
      ];

      const { container } = render(
        <TextField select SelectProps={{ native: true }} variant="standard">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>,
      );

      const select = container.querySelector('select');
      expect(select).not.to.equal(null);
      expect(select.options).to.have.lengthOf(2);
    });

    it('associates the label with the <select /> when `native={true}`', () => {
      const { getByRole } = render(
        <TextField
          label="Currency:"
          select
          SelectProps={{ native: true }}
          value="$"
          variant="standard"
        >
          <option value="dollar">$</option>
        </TextField>,
      );

      expect(getByRole('combobox', { name: 'Currency:' })).to.have.property('value', 'dollar');
    });

    it('renders a combobox with the appropriate accessible name', () => {
      const { getByRole } = render(
        <TextField select label="Release: " value="stable" variant="standard">
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="beta">Beta</MenuItem>
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      expect(getByRole('button')).toHaveAccessibleName('Release: Stable');
    });

    it('creates an input[hidden] that has no accessible properties', () => {
      const { container } = render(
        <TextField select label="Release: " value="stable" variant="standard">
          <MenuItem value="stable">Stable</MenuItem>
        </TextField>,
      );

      const input = container.querySelector('input[aria-hidden]');
      expect(input).not.to.have.attribute('id');
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders a combobox with the appropriate accessible description', () => {
      const { getByRole } = render(
        <TextField select helperText="Foo bar" value="10">
          <MenuItem value={10}>Ten</MenuItem>
        </TextField>,
      );

      expect(getByRole('button')).toHaveAccessibleDescription('Foo bar');
    });
  });

  it('should trigger `onClick` only once', () => {
    const handleClick = spy();
    const { getByRole } = render(
      <TextField variant="outlined" label="Test" onClick={handleClick} />,
    );
    fireEvent.click(getByRole('textbox'));
    expect(handleClick.callCount).to.equal(1);
  });
});
