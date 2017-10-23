import * as React from 'react';
import { StandardProps } from '..';

export interface SwitchBaseProps extends StandardProps<{}, SwitchBaseClassKey> {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  tabIndex?: number;
  value?: string;
}

export type SwitchBaseClassKey =
  | 'root'
  | 'default'
  | 'checked'
  | 'disabled'
  | 'input'
  ;

export type SwitchBase = React.Component<SwitchBaseProps>

export interface CreateSwitchBaseOptions {
  defaultIcon?: React.ReactNode;
  defaultCheckedIcon?: React.ReactNode;
  inputType?: string;
}

export default function createSwitch(
  options: CreateSwitchBaseOptions
): SwitchBase;
