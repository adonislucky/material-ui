import Alert from '@mui/material/Alert';

<Alert
  slots={{
    closeButton: ComponentsButton
  }}
  slotProps={{ closeButton: componentsButtonProps }}
/>;
<Alert
  slots={{
    closeIcon: SlotsIcon,
    closeButton: ComponentsButton
  }}
  slotProps={{
    closeIcon: slotsIconProps,
    closeButton: componentsButtonProps
  }} />;
<Alert
  slots={{ closeIcon: SlotsIcon, closeButton: SlotsButton }}
  slotProps={{ closeIcon: slotsIconProps, closeButton: slotsButtonProps }} />;
