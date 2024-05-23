import {
  useUpdateDataMutation,
  useGetDataQuery as getData,
} from "../../../store/dataApi";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import isEqual from "lodash.isequal";

import { IData, fieldNames } from "../../../types";
import { closeModal, getCurrentDataId } from "../../../store/modalSlice";

import Form from "./Form";

const Edit = () => {
  const dispatch = useDispatch();

  const { data } = getData();
  const [editData, { isError }] = useUpdateDataMutation();

  const currentDataId = useSelector(getCurrentDataId);
  const currentData = data?.filter((item) => item.id === currentDataId)[0];
  const { id, ...defaultValues } = currentData as IData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm<fieldNames>({ defaultValues: defaultValues });

  const onSubmit = (data: FieldValues) => {
    if (isEqual(data, defaultValues)) {
      dispatch(closeModal());
    } else {
      editData({ id: currentDataId, data });
      if (isError) {
        toast.error("Произошла ошибка");
      } else {
        toast.success("Запись изменена");
      }
      dispatch(closeModal());
    }
  };

  return (
    <Form
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      onSubmit={onSubmit}
      action="Сохранить"
      errors={errors}
      setFocus={setFocus}
    />
  );
};

export default Edit;
