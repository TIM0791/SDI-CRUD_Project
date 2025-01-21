import { Grid, Paper, IconButton } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CrstDialog from "./CrstDialog";
import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [crystals, setCrystals] = useState([]);
  const [open, setOpen]=useState(false);
  const [selectedCrystal, setSelectedCrystal] = useState(null);

  useEffect(() => {
    const crystData = async () => {
      try {
        const response = await fetch('http://localhost:8080/crystal');
        if (!response.ok) {
          throw new Error('Failed to fetch crystals');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setCrystals(data);

      } catch (error) {
        console.error('Error fetching crystals:', error.message);
      }
    };
    crystData();
  }, []);

  const handleUpdateCrystal = (updatedCrystal) => {
    setCrystals((prevCrystals) =>
      prevCrystals.map((crystal) =>
        crystal.id === updatedCrystal.id ? updatedCrystal : crystal
      )
    );
  };

  return(
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ backgroundColor: '#50C878' }}>
              <div><strong>Add Item</strong></div>
              <div>
                <IconButton aria-label="fingerprint" color="primary" onClick={() => setOpen(true)}>
                  <AddBoxOutlinedIcon />
                </IconButton>
                <CrstDialog
                  open={open}
                  setOpen={setOpen}
                  selectedCrystal={selectedCrystal}
                  onUpdateCrystal={handleUpdateCrystal} />
              </div>
            </Paper>
          </Grid>
          {crystals.map((crystal) => (
              <Grid item xs={4} key={crystal.id}>
                <Paper sx={{ backgroundColor: '#50C878' }}>
                  <div>
                    <strong>Name:</strong> {crystal.Name}
                  </div>
                  <div>
                    <img src={crystal.Image} alt={crystal.Name} />
                  </div>
                  <div>
                    <strong>Quantity:</strong> {crystal.Quantity}
                  </div>
                  <EditIcon onClick={() => {
                    setSelectedCrystal(crystal)
                    setOpen(true)
                  }}/>
                  <RemoveCircleIcon onClick={() => {
                    fetch(`http://localhost:8080/crystal/${crystal.id}`, {
                    method: 'DELETE'
                  })
                  .then(response => {
                    if (response.ok) {
                      setCrystals(prevCrystals => prevCrystals.filter(c=> c.id !== crystal.id));
                    } else {
                      console.log("Failed to delete crystal");
                    }
                  })
                  }}/>
                </Paper>
              </Grid>
          ))}
        </Grid>
)};

export default Inventory;