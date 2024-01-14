import React, { CSSProperties, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
// import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Form, useLocation } from "react-router-dom";
import { FIVE_MINUTES } from "constants";
import { useAppDispatch, useAppSelector, usePopUp } from "~utils/hooks";
import { addNewSecret } from "store/store";
import { Dialog, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { AppButton } from "~comps/UI_components/Button";

const formStyles: CSSProperties = {
  margin: '0 auto',
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px',
  gap: '10px'
};

interface ISecretFormProps {
  formCloseHandler: () => void,
  isSecretFormActive: boolean,
}
export const SecretForm: React.FC<ISecretFormProps> = ({ formCloseHandler, isSecretFormActive }) => {
  const { register, handleSubmit, control, watch, formState: { errors }, trigger } = useForm<ISecretForm>();
  const titleText = watch('title', '');
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const showPopUp = usePopUp();
  const url = useLocation();
  const maxTitleLength = 70;
  const minDate = dayjs().add(5, 'minute');
  const maxDate = dayjs().add(5, 'years');

  const submitHandler: SubmitHandler<ISecretForm> = async ({ date, file, title, description }) => {
    try {
      const availableAt = new Date(date.$d).toISOString();
      const formData = new FormData();
      formData.append('availableAt', availableAt);
      formData.append('file', file[0]);
      formData.append('title', title);
      formData.append('description', description);
      await serverAPI.post('secret', formData);
      formCloseHandler();
      showPopUp('Secret has been added', 'info');
      if (url.pathname === `/user/${id}`) {
        dispatch(addNewSecret());
      }
    } catch {
      showPopUp('Something went wrong', 'error');
    }
  };

  return (
    <Dialog open={isSecretFormActive} PaperProps={{ sx: { color: 'black', padding: '10px' } }} onClose={formCloseHandler}>
      <DialogTitle component={Typography} variant='h4' textAlign='center'>Add new secret</DialogTitle>
      <Grid container>
        <Grid item xs={12} >
          <Stack component={Form} onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data" method="post" sx={formStyles}>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Controller
                  name="date"
                  control={control}
                  rules={{ 
                    required: 'provide expired date',
                    validate: (date) => (new Date(date.$d).getTime() - Date.now()) > FIVE_MINUTES || 'date must be at least 5 minutes later from submit time'
                  }}
                  render={({ field }) => {
                    return <DateTimePicker
                      views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                      sx={{ '& .MuiInputLabel-root': { color: 'black' }, '& .MuiPickersDay-root': { color: 'black' } }}
                      minDate={minDate}
                      maxDate={maxDate}
                      ampm={false}
                      label='Choose expired date:'
                      {...field}
                    />;
                  }
                  }
                />
              </LocalizationProvider>
              {errors.date && <FormHelperText sx={{color: 'error.main'}}>{errors.date.message}</FormHelperText>}
            </FormControl>
            <FormControl >
              <InputLabel htmlFor='title' sx={{ color: 'black' }}>Secret's title</InputLabel>
              <Input sx={{ color: 'black' }} 
                  {...register('title', { 
                  maxLength: {value: maxTitleLength, message: 'max size exceeded'},
                  required: 'please, fill the title',
                  onChange: ()=> {trigger('title');}})}  
                error={!!errors.title} 
                multiline 
              />
              <FormHelperText sx={{ color: 'black' }}>{errors.title ? errors.title.message : `${maxTitleLength - titleText.length} chars left`}</FormHelperText>
            </FormControl>
            <FormControl >
              <InputLabel htmlFor='title' sx={{ color: 'black' }}>Secret's description</InputLabel>
              <Input sx={{ color: 'black' }} {...register('description')} multiline />
            </FormControl>
            
            <label htmlFor="file">Attach file</label>
            <input {...register('file', { required: true })} type={"file"} />
            {errors.file && <span className="secret-form__error">File isn't attached</span>}
            <AppButton type='submit'>Submit</AppButton>

          </Stack>
        </Grid>
      </Grid>

    </Dialog>
  );
};
