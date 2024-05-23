import { useDispatch, useSelector } from "react-redux";
import { useDeleteDataMutation } from "../../../store/dataApi";
import { toast } from "react-toastify";

import { Box, Typography, Button } from "@mui/material";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const [deleteData, { isError }] = useDeleteDataMutation();
  const currentDataId = useSelector(getCurrentDataId);
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteData(currentDataId);
    handleClose();
    if (isError) {
      toast.error("Произошла ошибка");
    } else {
      toast.success("Запись удалена");
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center">
        Вы уверены, что хотите удалить эту запись?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="contained" color="warning" onClick={handleDelete}>
          Удалить
        </Button>
      </Box>
    </Box>
  );
};

export default Delete;
