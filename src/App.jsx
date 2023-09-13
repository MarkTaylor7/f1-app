import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
  return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
}

const rows = [
  createData('Max Verstappen', 1, 1, 1, 1, 2),
  createData('Sergio Perez', 6, 3, 2, 4, 2),
  createData('Fernando Alonso', 7, 9, 5, 2, 9),
  createData('Lewis Hamilton', 3, 4, 4, 6, 6),
  createData('Carlos Sainz', 10, 8, 'DNF', 5, 3),
  createData('Charles Leclerc', 9, 7, 3, 'DNF', 4),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Driver</TableCell>
            <TableCell align="right">fiveRacesAgo</TableCell>
            <TableCell align="right">fourRacesAgo</TableCell>
            <TableCell align="right">threeRacesAgo</TableCell>
            <TableCell align="right">twoRacesAgo</TableCell>
            <TableCell align="right">oneRaceAgo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.fiveRacesAgo}</TableCell>
              <TableCell align="right">{row.fourRacesAgo}</TableCell>
              <TableCell align="right">{row.threeRacesAgo}</TableCell>
              <TableCell align="right">{row.twoRacesAgo}</TableCell>
              <TableCell align="right">{row.oneRaceAgo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}