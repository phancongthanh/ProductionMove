import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, setOpen, handleRecall}: any) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Chắc chắn thu hồi không?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Thu hồi toàn bộ sản phẩm thuộc dòng sản phẩm này
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Hủy</Button>
        <Button onClick={handleRecall} autoFocus color='error' variant="contained">
          Thu hồi 
        </Button>
      </DialogActions>
    </Dialog>
  );
}