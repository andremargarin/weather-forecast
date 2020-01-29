import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Search from './Search';


export default function Header(props) {
  const { onSelectLocation } = props;
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Typography component="h2" variant="h5">
          WEATHER FORECAST
        </Typography>
      </Grid>
      <Grid item>
        <Search onSelectLocation={onSelectLocation} />
      </Grid>
    </Grid>
  );
}
