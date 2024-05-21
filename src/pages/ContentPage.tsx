import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Container, Box } from '@mui/material';

import { useGetDataQuery as getData } from "../store/dataApi";
import { IData } from '../types';

const ContentPage = () => {
  const {data} = getData();
  console.log(data)
  return (
    <Box component="main" sx={{padding: '50px', backgroundColor: '#f2f6fc', height: '100vh'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Статус согласования</TableCell>
              <TableCell>Количество работников</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>Подпись работодателя</TableCell>
              <TableCell>Подпись работника</TableCell>
              <TableCell>Дата подписи работодателя</TableCell>
              <TableCell>Дата подписи работника</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: IData) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              > 
                {Object.entries(row).map(([key, value]) => key === 'id' ? null : 
                  (<TableCell key={value} component="th" scope="row">
                    {value}
                  </TableCell>)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContentPage;