import { Box, TextField, Button } from "@mui/material";
import { useCreateDataMutation } from "../../store/dataApi";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";

import entities from "../../entities";
import { fieldNames } from "../../types";
import { closeModal } from "../../store/modalSlice";

export interface IForm {
  companySigDate: string,
  companySignatureName: string,
  documentName: string,
  documentStatus: string,
  documentType: string,
  employeeNumber: string,
  employeeSigDate: Dayjs | null,
  employeeSignatureName: Dayjs | null,
}

const AddModal: React.FC = () => {
  const { register, handleSubmit, control } = useForm<IForm>({
    defaultValues: {
      employeeSigDate: null as Dayjs | null,
      employeeSignatureName: null as Dayjs | null,
    }
  });
  const dispatch = useDispatch();

  const [createData] = useCreateDataMutation();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    dispatch(closeModal());
  };

  const textFields = Object.entries(entities).map(([key, value]) => ({field: key, placeholder: value, id: nanoid()}));

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {textFields.map(({ field, placeholder, id }, index) => {
        return field === 'companySigDate' || field === 'employeeSigDate'
        ? <LocalizationProvider key={id} dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <Controller
            control={control}
            {...register(field as keyof fieldNames)}
            render={({ field }) => (
              <DateTimePicker
                label={placeholder}
                ampm={false}
                onChange={(date) => {
                  field.onChange(date?.toISOString());
                }}
              />
            )}
          />
        </DemoContainer>
      </LocalizationProvider>
        : <TextField
          key={id}
          {...register(field as keyof fieldNames)}
          margin="normal"
          fullWidth
          id={field}
          label={placeholder}
          autoFocus={index === 0}
        />
      })}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Создать запись
      </Button>
    </Box>
  )
}

export default AddModal;