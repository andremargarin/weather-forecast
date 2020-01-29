import React from "react";
import Grid from '@material-ui/core/Grid';
import Search from './Search';


export default function HomeView(props) {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Search onSelectLocation={props.onSelectLocation} />
    </Grid>
  );
}
