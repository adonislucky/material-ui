import * as React from 'react';
import Year from './Year';
import { DateType } from '@date-io/type';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { WrapperVariantContext } from '../../wrappers/WrapperVariantContext';

export interface YearSelectionProps {
  date: MaterialUiPickersDate;
  minDate: DateType;
  maxDate: DateType;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflowY: 'auto',
      height: '100%',
    },
  },
  { name: 'MuiPickersYearSelection' }
);

export const YearSelection: React.FC<YearSelectionProps> = ({
  date,
  onChange,
  onYearChange,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
      try {
        selectedYearRef.current.scrollIntoView({
          block: wrapperVariant === 'static' ? 'nearest' : 'center',
        });
      } catch (e) {
        // call without arguments in case when scrollIntoView works improperly (e.g. Firefox 52-57)
        selectedYearRef.current.scrollIntoView();
      }
    }
  }, []); // eslint-disable-line

  const currentYear = utils.getYear(date);
  const onYearSelect = React.useCallback(
    (year: number) => {
      const newDate = utils.setYear(date, year);
      if (onYearChange) {
        onYearChange(newDate);
      }

      onChange(newDate, true);
    },
    [date, onChange, onYearChange, utils]
  );

  return (
    <div>
      <div className={classes.container}>
        {utils.getYearRange(minDate, maxDate).map(year => {
          const yearNumber = utils.getYear(year);
          const selected = yearNumber === currentYear;

          return (
            <Year
              key={utils.format(year, 'year')}
              selected={selected}
              value={yearNumber}
              onSelect={onYearSelect}
              ref={selected ? selectedYearRef : undefined}
              disabled={Boolean(
                (disablePast && utils.isBeforeYear(year, utils.date())) ||
                  (disableFuture && utils.isAfterYear(year, utils.date()))
              )}
            >
              {utils.format(year, 'year')}
            </Year>
          );
        })}
      </div>
    </div>
  );
};
