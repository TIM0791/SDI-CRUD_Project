import { Tabs, Tab, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import cookie from 'cookie';
import Inventory from './components/Inventory';
import PrsnlMngmt from './components/PrsnlMngmt';
import PropTypes from 'prop-types';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const cookies = cookie.parse(document.cookie);
  const [value, setValue] = React.useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies.Admin) {
          setHasAccess(false);
          return;
        }

        setHasAccess(true)
      } catch (error) {
        console.error('Error fetching crystals:', error.message);
      }
    };
    fetchData();
  }, [cookies.Admin]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {hasAccess ? (
        <Box sx={{bgcolor:'#BCD5CF'}}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label='Inventory' {...a11yProps(0)}/>
            <Tab label='Personnel Management' {...a11yProps(1)}/>
          </Tabs>
          <TabPanel value={value} index={0}>
            <Inventory/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PrsnlMngmt/>
          </TabPanel>
        </Box>
      ) : (
        <div style={{color:'white'}}>You do not have access. Please return home and login.</div>
      )}
    </>
  );
};

export default Admin;
