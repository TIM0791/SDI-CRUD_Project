import { Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';

const Manifest = () => {
  const [crystals, setCrystals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/crystal/Manifestation');
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
    fetchData();
  }, [])

  return (
    <>
      {crystals.map((crystal) => (
  <Grid container spacing={2} key={crystal.id}>
    <Grid item xs={4}>
      <Paper sx={{ backgroundColor: '#BCD5CF' }}>
        <div>
          <strong>Name:</strong> {crystal.Name}
        </div>
        <div>
          <img src={crystal.Image} alt={crystal.Name} />
        </div>
        <div>
          <strong>Quantity:</strong> {crystal.Quantity}
        </div>
      </Paper>
    </Grid>
  </Grid>
))}
    </>
  );
};

export default Manifest;
