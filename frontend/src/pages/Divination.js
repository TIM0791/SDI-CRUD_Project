import { Grid, Paper } from '@mui/material';

const Divination = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{backgroundColor: '#BCD5CF'}}>Content goes here</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{backgroundColor: '#BCD5CF'}}>Content goes here</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{backgroundColor: '#BCD5CF'}}>Content goes here</Paper>
      </Grid>
      {/* Add more Grid items and Papers as needed */}
    </Grid>
  );
};

export default Divination;