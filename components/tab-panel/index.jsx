import Pt from 'prop-types'

import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: Pt.node,
  index: Pt.number.isRequired,
  value: Pt.number.isRequired,
};

export default TabPanel;