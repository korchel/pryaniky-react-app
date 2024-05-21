import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Box, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';

import { useGetDataQuery as getData, useCreateDataMutation, useDeleteDataMutation} from "../store/dataApi";
import { IData } from '../types';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';

const ContentPage = () => {
  const dispatch = useDispatch();

  const { data } = getData();
  const [deleteDta] = useDeleteDataMutation();
  const [createData] = useCreateDataMutation();

  const handleDelete = (id: string): void => {
    deleteDta(id);
  };

  const handleAdd = (): void => {
    dispatch(openModal({ type: 'add', open: true }));
  }

  const handleEdit = () => {

  }

  console.log(data)
  return (
    <Box component="main" sx={{padding: '50px', backgroundColor: '#f2f6fc', height: '100vh', position: 'relative'}}>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{position: 'sticky', left: '0', background: "white"}}>№</TableCell>
              <TableCell>Статус согласования</TableCell>
              <TableCell>Количество работников</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>Подпись работодателя</TableCell>
              <TableCell>Подпись работника</TableCell>
              <TableCell>Дата подписи работодателя</TableCell>
              <TableCell>Дата подписи работника</TableCell>
              <TableCell sx={{position: 'sticky', right: '0', background: "white"}}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: IData, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{position: 'sticky', left: '0', background: "white"}}>{index + 1}</TableCell>
                {Object.entries(row).map(([key, value]) => key === 'id' ? null : 
                  (<TableCell key={uuidv4()} component="th" scope="row">
                    {value}
                  </TableCell>)
                )}
                <TableCell sx={{position: 'sticky', right: '0', background: "white"}} >
                  <ButtonGroup variant="text">
                    <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton sx={{ position: 'absolute', right: '50px'}} onClick={handleAdd}>
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

export default ContentPage;