import { useSelector } from "react-redux";
import MaterialModal from '@mui/material/Modal';

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { getModalOpen, getModalType } from "../../store/modalSlice";

const modals = {
  add: AddModal,
  edit: EditModal,
  delete: DeleteModal,
};

const Modal = () => {
  const modalType = useSelector(getModalType);
  const open = useSelector(getModalOpen);

  const Component = modalType && modals[modalType];
  return (
    <MaterialModal open={open}>
      <p>modal</p>
    </MaterialModal>
  )
};

export default Modal;