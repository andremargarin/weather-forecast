import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeView from './HomeView';
import ForecastView from './ForecastView';
import { getForecastData } from '../api';


export default function App() {
  const [selectedLocation, setSelectedLocation]= useState();
  const history = useHistory();

  const handleSelectLocation = (location) => {
    const date = new Date().toISOString().split('T')[0];
    setSelectedLocation(location);
    getForecastData(location.code, date).then(data => {
      history.push(`/forecast/${location.code}/${date}/`);
    });
  }

  return (
    <Container maxWidth="lg">
      <Grid>
        <Switch>
          <Route
            path="/forecast/:locationCode/:date"
            render={routeProps => (
              <ForecastView location={selectedLocation} onSelectLocation={handleSelectLocation} />
            )}
          />
          <Route
            path="/"
            exact
            render={routeProps => (
              <HomeView onSelectLocation={handleSelectLocation} />
            )}
          />
        </Switch>
      </Grid>
    </Container>
  );
}
