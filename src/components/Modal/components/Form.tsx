import { TextField, Button, Stack } from "@mui/material";

import {
  FieldValues,
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  UseFormSetFocus,
} from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import entities from "../../../entities";
import { fieldNames } from "../../../types";
import React, { useEffect } from "react";
import dayjs from "dayjs";

interface IFormProps {
  control: Control<fieldNames, any>;
  handleSubmit: UseFormHandleSubmit<fieldNames, undefined>;
  onSubmit: (data: FieldValues) => void;
  register: UseFormRegister<fieldNames>;
  action: string;
  errors: FieldErrors<fieldNames>;
  setFocus: UseFormSetFocus<fieldNames>;
}

const Form: React.FC<IFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  register,
  action,
  errors,
  setFocus,
}) => {
  const textFields = Object.entries(entities).map(([key, value]) => ({
    field: key,
    placeholder: value,
    id: nanoid(),
  }));

  useEffect(() => {
    setFocus("documentStatus");
  });

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      {textFields.map(({ field, placeholder, id }, index) => {
        return field === "companySigDate" || field === "employeeSigDate" ? (
          <LocalizationProvider key={id} dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <Controller
                control={control}
                name={field}
                render={({ field }) => (
                  <DateTimePicker
                    label={placeholder}
                    ampm={false}
                    value={dayjs(field.value)}
                    onChange={(date) => {
                      field.onChange(date?.toISOString());
                    }}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        ) : (
          <TextField
            key={id}
            {...register(field as keyof fieldNames, {
              required: {
                value: field === "documentName" || field === "documentStatus",
                message: "Обязательное поле",
              },
            })}
            margin="normal"
            fullWidth
            id={field}
            label={placeholder}
            autoFocus={index === 0}
            sx={{ pt: 1 }}
            required={field === "documentName" || field === "documentStatus"}
            error={!!errors[field as keyof fieldNames]}
            helperText={errors[field as keyof fieldNames]?.message}
          />
        );
      })}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {action}
      </Button>
    </Stack>
  );
};

export default Form;
