import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';
import cookie from 'cookie';

const CrstDialog = ({ open, setOpen }) => {
  const [name, setName]=useState("");
  const [description, setDescription]=useState("");
  const [quantity, setQuantity]=useState("");
  const [image, setImage]=useState("");
  const cookies = cookie.parse(document.cookie);

  const newCrst = async () => {
    try {
      const response = await fetch('http://localhost:8080/crystal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          AdminID: cookies.Admin,
          Name: name,
          Description: description,
          Quantity: quantity,
          Image: image,
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
      <DialogTitle>Add Crystal</DialogTitle>
      <DialogContent >
        <DialogContentText>
          Please Add your new stock details below
        </DialogContentText>
        <TextField
          required
          fullWidth
          id="Name"
          label="Name"
          variant="filled"
          size="small"
          margin="normal"
          value={name}
          onChange={(n) => setName(n.target.value)}
        />
        <TextField
          required
          fullWidth
          id="Description"
          label="Description"
          variant="filled"
          size="small"
          margin="normal"
          value={description}
          onChange={(d) => setDescription(d.target.value)}
        />
        <TextField
        required
        fullWidth
        id="Quantity"
        label="Quantity"
        variant="filled"
        size="small"
        margin="normal"
        value={quantity}
        onChange={(q) => setQuantity(Number(q.target.value))}
        />
        <TextField
        required
        fullWidth
        id="Image"
        label="Image"
        variant="filled"
        size="small"
        margin="normal"
        value={image}
        onChange={(i) => setImage(i.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={newCrst}>Add</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrstDialog;
