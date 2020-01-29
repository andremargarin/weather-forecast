import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function ForecastDetail({data}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell>Hour</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Feels Like</TableCell>
            <TableCell>Wind</TableCell>
            <TableCell>Pressure</TableCell>
            <TableCell>Rain</TableCell>
            <TableCell>Humidity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.weather_description}</TableCell>
              <TableCell>{row.temp} °C</TableCell>
              <TableCell>{row.feels_like} °C</TableCell>
              <TableCell>{row.wind_speed} (direction {row.wind_deg})°</TableCell>
              <TableCell>{row.pressure} hpa</TableCell>
              <TableCell>{row.rain ? (`${row.rain} mm`):(`-`)}</TableCell>
              <TableCell>{row.humidity} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
