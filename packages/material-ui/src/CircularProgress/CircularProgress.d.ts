import * as React from 'react';
import { StandardProps } from '..';

export interface CircularProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CircularProgressClassKey> {
  color?: 'primary' | 'secondary' | 'inherit';
  disableShrink?: boolean;
  size?: number | string;
  thickness?: number;
  value?: number;
  variant?: 'determinate' | 'indeterminate' | 'static';
}

export type CircularProgressClassKey =
  | 'root'
  | 'static'
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'svg'
  | 'circle'
  | 'circleStatic'
  | 'circleIndeterminate'
  | 'circleDisableShrink';

declare const CircularProgress: React.ComponentType<CircularProgressProps>;

export default CircularProgress;
