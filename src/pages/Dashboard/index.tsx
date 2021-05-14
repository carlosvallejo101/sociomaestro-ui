import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { Builder, Builders } from '../Home/builder.types';
import { config } from '../../config';

interface Column {
  id:
    | 'id'
    | 'participant'
    | 'citie'
    | 'identification'
    | 'names'
    | 'phoneNumber'
    | 'email';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'participant', label: 'Socio', minWidth: 170 },
  { id: 'citie', label: 'Ciudad', minWidth: 100 },
  {
    id: 'identification',
    label: 'Cédula',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'names',
    label: 'Nombre',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'phoneNumber',
    label: 'Número de Teléfono',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'email',
    label: 'Correo',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  id: number;
  participant: string;
  citie: string;
  identification: string;
  names: string;
  phoneNumber: string;
  email: string;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50px',
  },
  root: {
    width: '80%',
    marginTop: '20px',
  },
  container: {
    maxHeight: 440,
  },
});

export const Dashboard = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rows, setRows] = useState<Data[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      const response: any = await axios.get(`${config.backend.url}/builders`);
      const builders: Builders = response.data;
      builders.map((builder: Builder, index) => {
        const newData: Data = {
          id: index,
          participant: `${builder.participantName} ${builder.participantLastNames}`,
          citie: `${builder.city}`,
          identification: `${builder.identification}`,
          names: `${builder.names} ${builder.lastNames}`,
          phoneNumber: builder.phoneNumber,
          email: builder.email,
        };
        rows.push(newData);
        setRows([...rows]);
      });
    })();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h2>Dashboard</h2>
      <Button variant="contained" color="primary" onClick={() => {}}>
        Descargar
      </Button>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
