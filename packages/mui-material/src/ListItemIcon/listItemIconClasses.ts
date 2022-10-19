import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface ListItemIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
}

export type ListItemIconClassKey = keyof ListItemIconClasses;

export function getListItemIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemIcon', slot);
}

const listItemIconClasses: ListItemIconClasses = generateUtilityClasses('MuiListItemIcon', [
  'root',
  'alignItemsFlexStart',
]);

export default listItemIconClasses;
