import { useDispatch, useSelector } from "react-redux";
import MaterialModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Box } from "@mui/material";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { closeModal, getModalOpen, getModalType } from "../../store/modalSlice";


const modals = {
  add: AddModal,
  edit: EditModal,
  delete: DeleteModal,
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const Modal: React.FC = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(getModalType);
  const open = useSelector(getModalOpen);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const Component = modals[modalType!];

  return (
    <MaterialModal
      open={open}
      onClose={(handleClose)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          <>
            {modalType && <Component />}
          </>
        </Box>
      </Fade>
    </MaterialModal>
  )
};

export default Modal;