import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalClose from '@mui/joy/ModalClose';

function AddTodo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer anchor={'bottom'} open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>
          <input type="text" placeholder="What to do?" />
        </DialogTitle>
      </Drawer>
    </Box>
  );
}

export default AddTodo;
