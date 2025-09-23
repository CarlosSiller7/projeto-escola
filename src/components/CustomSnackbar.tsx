import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

// Define as props que o componente vai receber
type CustomSnackbarProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
};

export default function CustomSnackbar({
  open,
  message,
  severity,
  onClose,
}: CustomSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        icon={<CheckIcon fontSize="inherit" />} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}