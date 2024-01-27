import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';

const LoginDialog = ({ open, setOpen }) => {
  return (
    <Dialog PaperProps={{style: { backgroundColor: "#E3DAC9"/*backgroundColor: "#776885"*/ }}} open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent >
        <DialogContentText>
          Please Login with your Email and Password
        </DialogContentText>
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          variant="filled"
          size="small"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="password"
          type="password"
          autocomplete="current-password"
          label="Password"
          variant="filled"
          size="small"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
