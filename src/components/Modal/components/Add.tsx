import { useCreateDataMutation } from "../../../store/dataApi";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { fieldNames } from "../../../types";
import { closeModal } from "../../../store/modalSlice";
import Form from "./Form";

const Add = () => {
  const { register, handleSubmit, control } = useForm<fieldNames>();
  const dispatch = useDispatch();

  const [createData] = useCreateDataMutation();

  const onSubmit = (data: FieldValues) => {
    createData(data);
    dispatch(closeModal());
  };

  return <Form register={register} handleSubmit={handleSubmit} control={control} onSubmit={onSubmit} action="Создать запись" />
};

export default Add;