import { Grid, Paper, IconButton } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PplDialog from './PplDialog';
import React, { useState, useEffect } from 'react';


const PrsnlMngmt = () => {
  const [teammates, setTeammates] = useState([]);
  const [open, setOpen]=useState(false);

  useEffect(() => {
    const pplData = async () => {
      try{
        const response = await fetch('http://localhost:8080/user');

        if (!response.ok) {
          throw new Error('Failed to fetch Teammates');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setTeammates(data);

      } catch (error) {
        console.log('There was an error retrieving Team Member Data:', error.message)
      };
    };
    pplData();
  }, []);

//Add dialog box after IconButton but before the div closes to add teammates
  return(
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{backgroundColor: '#50C878'}}>
          <div><strong>Add Team Member</strong></div>
          <div>
            <IconButton aria-label="fingerprint" color="primary" onClick={() => setOpen(true)}>
              <AddBoxOutlinedIcon />
            </IconButton>
            <PplDialog open={open} setOpen={setOpen} />
          </div>
        </Paper>
      </Grid>
      {teammates.map((member) => (
      <Grid item xs={4} key={member.id}>
        <Paper sx={{ backgroundColor: '#50C878' }}>
          <div>
            <strong>{`${member.First_Name} ${member.Last_Name}`}</strong>
          </div>
          <div>
            <strong>{member.Username}</strong>
          </div>
          <EditIcon />
          <RemoveCircleIcon />
        </Paper>
      </Grid>
      ))}
    </Grid>
  )
};

export default PrsnlMngmt;