import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createClientRender, createMount, describeConformance } from 'test/utils';
import Typography, { typographyClasses } from '../Typography';
import Stepper from '../Stepper';
import Step from '../Step';
import StepIcon from '../StepIcon';
import StepLabel from './StepLabel';

describe('<StepLabel />', () => {
  let classes;
  let iconClasses;
  const mount = createMount({ strict: true });
  const render = createClientRender();

  before(() => {
    classes = getClasses(<StepLabel />);
    iconClasses = getClasses(<StepIcon />);
  });

  describeConformance(<StepLabel />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  describe('label content', () => {
    it('renders the label from children', () => {
      const { getByText } = render(<StepLabel>Step One</StepLabel>);
      getByText('Step One');
    });

    it('renders <StepIcon> with props passed through StepIconProps', () => {
      const stepIconProps = { error: true };

      const { container } = render(
        <Stepper alternativeLabel>
          <Step active completed>
            <StepLabel StepIconProps={stepIconProps}>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      // Should render WarningIcon instead of CheckCircleIcon because of { error: true } props
      expect(icon).to.have.attribute('data-testid').equal('WarningIcon');
    });
  });

  describe('prop: StepIconComponent', () => {
    it('should render', () => {
      const CustomizedIcon = () => <div data-testid="custom-icon" />;
      const { container, getByTestId } = render(
        <Step active completed>
          <StepLabel StepIconComponent={CustomizedIcon}>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${classes.iconContainer}`);
      const label = container.querySelector(`.${classes.label}`);

      getByTestId('custom-icon');
      expect(icon).to.not.equal(null);
      expect(icon).to.not.have.attribute('data-testid').equal('CheckCircleIcon');
      expect(label).to.have.class(classes.active);
      expect(label).to.have.class(classes.completed);
    });

    it('should not render', () => {
      const { container } = render(
        <Step active completed>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.equal(null);
    });
  });

  describe('<Step /> prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const { container } = render(
        <Step active>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const typography = container.querySelector(`.${typographyClasses.root}`);
      expect(typography).to.have.class(classes.active);
    });

    it('renders <StepIcon> with the <Step /> prop active set to true', () => {
      const { container } = render(
        <Stepper>
          <Step active>
            <StepLabel>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(iconClasses.active);
    });

    it('renders <Typography> without the className active', () => {
      const { container } = render(
        <Step active={false}>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const typography = container.querySelector(`.${typographyClasses.root}`);
      expect(typography).to.not.have.class(classes.active);
    });
  });

  describe('<Step /> prop: completed', () => {
    it('renders <Typography> with the className completed', () => {
      const { container } = render(
        <Step completed>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const typography = container.querySelector(`.${typographyClasses.root}`);
      expect(typography).to.have.class(classes.active);
    });

    it('renders <StepIcon> with the prop completed set to true', () => {
      const { container } = render(
        <Stepper>
          <Step completed>
            <StepLabel>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(iconClasses.active);
    });
  });

  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const { container } = render(<StepLabel error>Step One</StepLabel>);

      const typography = container.querySelector(`.${typographyClasses.root}`);
      expect(typography).to.have.class(classes.error);
    });

    it('renders <StepIcon> with the prop error set to true', () => {
      const { container } = render(
        <Stepper>
          <Step>
            <StepLabel error>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(classes.error);
    });
  });

  describe('<Step /> prop: disabled', () => {
    it('renders with disabled className when disabled', () => {
      const { container } = render(
        <Step disabled>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const label = container.querySelector(`.${classes.root}`);
      expect(label).to.have.class(classes.disabled);
    });
  });

  describe('prop: optional = Optional Text', () => {
    it('creates a <Typography> component with text "Optional Text"', () => {
      const { getByText } = render(
        <StepLabel optional={<Typography variant="caption">Optional Text</Typography>}>
          Step One
        </StepLabel>,
      );

      getByText('Optional Text');
    });
  });
});
