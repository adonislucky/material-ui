import * as React from 'react';
import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function PortalTrapFocus() {
  const [open, setOpen] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      {open && (
        <TrapFocus open>
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
            <label>
              First name: <input type="text" />
            </label>
            <br />
            <Portal container={container}>
              <label>
                Last name: <input type="text" />
              </label>
              <br />
            </Portal>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </Box>
        </TrapFocus>
      )}
      <div ref={setContainer} />
    </Box>
  );
}
