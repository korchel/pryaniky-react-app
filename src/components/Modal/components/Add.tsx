import { useCreateDataMutation } from "../../../store/dataApi";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { fieldNames } from "../../../types";
import { closeModal } from "../../../store/modalSlice";
import Form from "./Form";

const Add = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<fieldNames>();
  const dispatch = useDispatch();

  const [createData, { isError }] = useCreateDataMutation();

  const onSubmit = (data: FieldValues) => {
    createData(data);
    dispatch(closeModal());
    if (isError) {
      toast.error("Произошла ошибка");
    } else {
      toast.success("Запись добавлена");
    }
  };

  return (
    <>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        onSubmit={onSubmit}
        action="Создать запись"
        errors={errors}
        setFocus={setFocus}
      />
    </>
  );
};

export default Add;
