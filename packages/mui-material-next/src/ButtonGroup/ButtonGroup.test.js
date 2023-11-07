import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, screen } from '@mui-internal/test-utils';
import ButtonGroup, { buttonGroupClasses as classes } from '@mui/material-next/ButtonGroup';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import Button, { buttonClasses } from '@mui/material-next/Button';
import ButtonGroupContext from './ButtonGroupContext';

describe('<ButtonGroup />', () => {
  const { render } = createRenderer();

  let originalMatchmedia;

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describeConformance(
    <ButtonGroup>
      <Button>Conformance?</Button>
    </ButtonGroup>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiButtonGroup',
      testVariantProps: { variant: 'contained' },
      skip: ['componentsProp'],
      ThemeProvider: CssVarsProvider,
      createTheme: extendTheme,
    }),
  );

  it('should render with the root class but no others', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    expect(buttonGroup).to.have.class(classes.root);
    expect(buttonGroup).not.to.have.class(classes.contained);
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedOutlined);
    expect(button).to.have.class(classes.groupedOutlinedPrimary);
    expect(button).not.to.have.class(classes.groupedOutlinedSecondary);
  });

  it('can render an outlined primary button', () => {
    const { getByRole } = render(
      <ButtonGroup color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.colorPrimary);
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedOutlined);
    expect(button).to.have.class(classes.groupedOutlinedPrimary);
    expect(button).not.to.have.class(classes.groupedOutlinedSecondary);
  });

  // TODO v6: change to filled when MD3 styles are applied
  it('can render a text button', () => {
    const { getByRole } = render(
      <ButtonGroup variant="text">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.text);
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedText);
    expect(button).to.have.class(classes.groupedTextPrimary);
    expect(button).not.to.have.class(classes.groupedTextSecondary);
  });

  it('can render a small button', () => {
    const { getByRole } = render(
      <ButtonGroup size="small">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.sizeSmall);
  });

  it('can render a large button', () => {
    const { getByRole } = render(
      <ButtonGroup size="large">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.outlined);
    expect(button).to.have.class(buttonClasses.sizeLarge);
  });

  it('should have a ripple by default', () => {
    const { container } = render(
      <ButtonGroup>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('.touchRipple')).not.to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(
      <ButtonGroup disableElevation>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class(buttonClasses.disableElevation);
  });

  it('can disable the ripple', () => {
    const { container } = render(
      <ButtonGroup disableRipple>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('.touchRipple')).to.equal(null);
  });

  it('should not be fullWidth by default', () => {
    const { container, getByRole } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    const buttonGroup = container.firstChild;
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(buttonClasses.fullWidth);
  });

  it('can pass fullWidth to Button', () => {
    const { container, getByRole } = render(
      <ButtonGroup fullWidth>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    const button = getByRole('button');
    expect(buttonGroup).to.have.class(classes.fullWidth);
    expect(button).to.have.class(buttonClasses.fullWidth);
  });

  it('classes.grouped should be merged with Button className', () => {
    render(
      <ButtonGroup>
        <Button className="foo-bar">Hello World</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button')).to.have.class(classes.grouped);
    expect(screen.getByRole('button')).to.have.class('foo-bar');
  });

  it('should forward the context to children', () => {
    let context;
    render(
      <ButtonGroup size="large" variant="contained">
        <ButtonGroupContext.Consumer>
          {(value) => {
            context = value;
          }}
        </ButtonGroupContext.Consumer>
      </ButtonGroup>,
    );
    expect(context.variant).to.equal('contained');
    expect(context.size).to.equal('large');
    expect(context.fullWidth).to.equal(false);
    expect(context.disableRipple).to.equal(false);
    expect(context.disableTouchRipple).to.equal(false);
    expect(context.disableElevation).to.equal(false);
    expect(context.disabled).to.equal(false);
    expect(context.color).to.equal('primary');
  });

  describe('theme default props on Button', () => {
    it('should override default variant prop', () => {
      render(
        <CssVarsProvider
          theme={extendTheme({
            components: {
              MuiButton: {
                defaultProps: {
                  color: 'primary',
                  size: 'medium',
                  variant: 'contained',
                },
              },
            },
          })}
        >
          <ButtonGroup variant="outlined" size="small" color="secondary">
            <Button>Hello World</Button>
          </ButtonGroup>
        </CssVarsProvider>,
      );

      expect(screen.getByRole('button')).to.have.class(buttonClasses.outlined);
      expect(screen.getByRole('button')).to.have.class(buttonClasses.sizeSmall);
      expect(screen.getByRole('button')).to.have.class(buttonClasses.colorSecondary);
    });
  });

  describe('position classes', () => {
    it('correctly applies position classes to buttons', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>,
      );

      const firstButton = screen.getAllByRole('button')[0];
      const middleButton = screen.getAllByRole('button')[1];
      const lastButton = screen.getAllByRole('button')[2];

      expect(firstButton).to.have.class(classes.firstButton);
      expect(firstButton).not.to.have.class(classes.middleButton);
      expect(firstButton).not.to.have.class(classes.lastButton);

      expect(middleButton).to.have.class(classes.middleButton);
      expect(middleButton).not.to.have.class(classes.firstButton);
      expect(middleButton).not.to.have.class(classes.lastButton);

      expect(lastButton).to.have.class(classes.lastButton);
      expect(lastButton).not.to.have.class(classes.middleButton);
      expect(lastButton).not.to.have.class(classes.firstButton);
    });

    it('does not apply any position classes to a single button', () => {
      render(
        <ButtonGroup>
          <Button>Single Button</Button>
        </ButtonGroup>,
      );

      const button = screen.getByRole('button');

      expect(button).not.to.have.class(classes.firstButton);
      expect(button).not.to.have.class(classes.middleButton);
      expect(button).not.to.have.class(classes.lastButton);
    });
  });
});
