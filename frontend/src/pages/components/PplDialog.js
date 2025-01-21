import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';

const PplDialog = ({ open, setOpen }) => {
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [username, setUserName]=useState("");
  const [password, setPassword]=useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(true);

  const newPpl = async () => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          First_Name: firstName,
          Last_Name: lastName,
          Username: username,
          Password: password,
        }),
      });

      if (response.ok) {
        // add successful, handle further actions (e.g., redirect, set state, etc.)
        setOpen(false); // Close the dialog
      } else {
        // add failed, handle error (e.g., show error message)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Dialog PaperProps={{style: { backgroundColor: "#E3DAC9" }}} open={open}>
      <DialogTitle>Add Teammate</DialogTitle>
      <DialogContent >
        <DialogContentText>
          Please Add Employee details
        </DialogContentText>
        <TextField
          required
          fullWidth
          id="First_Name"
          label="First Name"
          variant="filled"
          size="small"
          margin="normal"
          value={firstName}
          onChange={(n) => setFirstName(n.target.value)}
        />
        <TextField
          required
          fullWidth
          id="Last_Name"
          label="Last Name"
          variant="filled"
          size="small"
          margin="normal"
          value={lastName}
          onChange={(lN) => setLastName(lN.target.value)}
        />
        <TextField
        required
        fullWidth
        id="Username"
        label="Username"
        variant="filled"
        size="small"
        margin="normal"
        value={username}
        onChange={(u) => setUserName((u.target.value))}
        />
        <TextField
        required
        fullWidth
        id="Password"
        label="Password"
        variant="filled"
        type="password"
        size="small"
        margin="normal"
        value={password}
        onChange={(p) => setPassword(p.target.value)}
        />
        <TextField
        required
        fullWidth
        id="Auth"
        label="Verify Password"
        variant="filled"
        type="password"
        size="small"
        margin="normal"
        value={verifyPassword}
        onChange={(vP) => {
          setVerifyPassword(vP.target.value);
          if (vP.target.value.length > 0) {
            setError(vP.target.value !== password)
          } else {setError(true)}
        }}
        error={error}
        helperText={error ? "Passwords do not match. Please try again." : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={newPpl} disabled={error}>Add</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PplDialog;
