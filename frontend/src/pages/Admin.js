import { Grid, Paper } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React, { useState, useEffect } from 'react';
import cookie from 'cookie';

const Admin = () => {
  const [crystals, setCrystals] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const cookies = cookie.parse(document.cookie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies.Admin) {
          setHasAccess(false);
          return;
        }

        setHasAccess(true)
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

    fetchData();
  }, [cookies.Admin]);

  return (
    <>
      {hasAccess ? (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ backgroundColor: '#BCD5CF' }}>
              <div><strong>Add Item</strong></div>
              <div><AddBoxOutlinedIcon /></div>
            </Paper>
          </Grid>
          {crystals.map((crystal) => (
              <Grid item xs={4} key={crystal.id}>
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
          ))}
        </Grid>
      ) : (
        <div style={{color:'white'}}>You do not have access. Please return home and login.</div>
      )}
    </>
  );
};

export default Admin;
