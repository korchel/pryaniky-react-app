import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { nanoid } from "@reduxjs/toolkit";

import { useGetDataQuery as getData } from "../store/dataApi";
import { IData } from "../types";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import Modal from "../components/Modal/Modal";
import entities from "../entities";

const stickyRight = {
  position: "sticky",
  right: "0",
  background: "white",
};

const stickyLeft = {
  position: "sticky",
  left: "0",
  background: "white",
};

const ContentPage = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = getData();

  const handleDelete = (id: string): void => {
    dispatch(openModal({ type: "delete", open: true, id }));
  };

  const handleAdd = (): void => {
    dispatch(openModal({ type: "add", open: true }));
  };

  const handleEdit = (id: string): void => {
    dispatch(openModal({ type: "edit", open: true, id }));
  };
  const textFields = Object.entries(entities).map(([key, value]) => ({
    name: value,
    id: nanoid(),
  }));

  if (isLoading) {
    return (
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="div" sx={{ py: "50px", position: "relative" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={stickyLeft}>
                №
              </TableCell>
              {textFields.map(({ name, id }) => (
                <TableCell key={id}>{name}</TableCell>
              ))}
              <TableCell sx={stickyRight}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: IData, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" sx={stickyLeft}>
                  {index + 1}
                </TableCell>
                {Object.entries(row).map(([key, value]) =>
                  key === "id" ? null : (
                    <TableCell key={nanoid()} component="th" scope="row">
                      {value}
                    </TableCell>
                  ),
                )}
                <TableCell sx={stickyRight}>
                  <ButtonGroup variant="text">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleEdit(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        sx={{ position: "absolute", right: "50px" }}
        onClick={handleAdd}
      >
        <AddCircleIcon />
      </IconButton>
      <Modal />
    </Box>
  );
};

export default ContentPage;
