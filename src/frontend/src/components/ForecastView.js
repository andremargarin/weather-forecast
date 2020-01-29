import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ForecastTable from './ForecastTable';
import Header from './Header';
import { getForecastData } from '../api';
import { getDaysArray } from '../utils';


function TabPanel(props) {
  const {children, value, index} = props;
  return (
    <Typography component="div" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


export default function ForecastView(props) {
  const [forecastData, setForecastData] = useState([]);
  const [value, setValue] = React.useState(0);
  const { locationCode } = useParams();
  const history = useHistory();

  const handleTabChange = (locationCode, date) => {
    getForecastData(locationCode, date).then(data => {
      setForecastData(data);
      history.push(`/forecast/${locationCode}/${date}/`);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleTabChange(locationCode, event.target.innerHTML);
  };

  return (
    <>
      <Header onSelectLocation={props.onSelectLocation} />
      { props.location &&
        <Typography component="h6">
          Previsão do tempo em {props.location.name} - {props.location.country}
        </Typography>
      }

      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
        {getDaysArray().map((date) => (
          <Tab key={date.toISOString()} label={date.toISOString().split('T')[0]} />
        ))}
      </Tabs>

      {getDaysArray().map((date, index) => (
        <TabPanel key={date} value={value} index={index} style={{ minHeight: '100vh' }}>
            <Grid container spacing={0} direction="row">
              <Grid item xs={12}>
                <ForecastTable data={forecastData} />
              </Grid>
            </Grid>
        </TabPanel>
      ))}
    </>
  );
}
