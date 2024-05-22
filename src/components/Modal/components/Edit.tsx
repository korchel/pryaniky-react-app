import { useUpdateDataMutation, useGetDataQuery as getData } from "../../../store/dataApi";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { IData, fieldNames } from "../../../types";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";

import Form from "./Form";

const Edit = () => {
  const dispatch = useDispatch();

  const { data } = getData();
  const [editData] = useUpdateDataMutation();

  const currentDataId = useSelector(getCurrentDataId);
  const currentData = data?.filter((item) => item.id === currentDataId)[0];
  const { id, ...defaultValues } = currentData as IData;

  const { register, handleSubmit, control } = useForm<fieldNames>({defaultValues: defaultValues});

  const onSubmit = (data: FieldValues) => {
    editData({id: currentDataId, data});
    dispatch(closeModal());
  };

  return (
    <Form register={register} handleSubmit={handleSubmit} control={control} onSubmit={onSubmit} action="Сохранить" />
  );
};

export default Edit;