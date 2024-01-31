import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';

const LoginDialog = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          Username: email,
          Password: password,
        }),
      });

      if (response.ok) {
        // Login successful, handle further actions (e.g., redirect, set state, etc.)
        console.log('Login successful!');
        setOpen(false); // Close the dialog
      } else {
        // Login failed, handle error (e.g., show error message)
        console.log('Login failed!');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(p) => setPassword(p.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
