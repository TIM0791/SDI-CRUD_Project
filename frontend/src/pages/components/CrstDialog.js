import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, TextField, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import cookie from 'cookie';

const CrstDialog = ({ open, setOpen, selectedCrystal, onUpdateCrystal }) => {
  const [name, setName]=useState(selectedCrystal?.Name || "");
  const [description, setDescription]=useState(selectedCrystal?.Description || "");
  const [quantity, setQuantity]=useState(selectedCrystal?.Quantity || "");
  const [image, setImage]=useState(selectedCrystal?.Image || "");
  const cookies = cookie.parse(document.cookie);

  useEffect(() => {
    if (selectedCrystal) {
      setName(selectedCrystal.Name);
      setImage(selectedCrystal.Image);
      setQuantity(selectedCrystal.Quantity);
    }
  }, [selectedCrystal]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/crystal/${selectedCrystal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Image: image, Quantity: quantity }),
      });

      if (response.ok) {
        const updatedCrystal = await response.json();

        // Update parent state dynamically and close
        onUpdateCrystal(updatedCrystal);
        setOpen(false);
      } else {
        console.error("Error updating crystal");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        setOpen(false);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDescription(event.target.value);
  };

  return (
    <Dialog PaperProps={{style: { backgroundColor: "#E3DAC9" }}} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{selectedCrystal ? "Edit Crystal" : "Add Crystal"}</DialogTitle>
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
        <Select
          required
          fullWidth
          id="Description"
          label="Description"
          variant="filled"
          size="small"
          margin="normal"
          value={description}
          onChange={handleChange}
        >
          <MenuItem value={'Divination'}>Divination</MenuItem>
          <MenuItem value={'Healing'}>Healing</MenuItem>
          <MenuItem value={'Manifestation'}>Manifestation</MenuItem>
        </Select>
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
        <Button variant="contained" onClick={selectedCrystal ? handleSave : newCrst}>
          {selectedCrystal ? "Update" : "Add"}
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrstDialog;
