import React, { CSSProperties, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ESecretType, ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { Form, useLocation } from "react-router-dom";
import { FIVE_MINUTES } from "app_constants";
import { useAppDispatch, useAppSelector, usePopUp } from "~utils/hooks";
// import { addNewSecret } from "store/store";
import { Button, Dialog, DialogTitle, FormControl, FormHelperText,  Input, InputLabel, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { AppButton } from "~comps/UI_components/Button";
import { UploadFile } from "@mui/icons-material";
import { FutureSecret } from "~comps/Secrets/FutureSecret";

const formStyles: CSSProperties = {
  margin: '0 auto',
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px',
  gap: '10px',
  width: '380px'
};

interface ISecretFormProps {
  formCloseHandler: () => void,
  isSecretFormActive: boolean,
}
export const SecretForm: React.FC<ISecretFormProps> = ({ formCloseHandler, isSecretFormActive }) => {
  const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger, reset, getValues } = useForm<ISecretForm>();
  const [fileName, setFileName] = useState(' ');
  const [preview, setPreview] = useState<ISecretForm>();
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
      reset();
      formCloseHandler();
      showPopUp('Secret has been added', 'info');
      if (url.pathname === `/user/${id}`) {
        // dispatch(addNewSecret());
      }
    } catch {
      showPopUp('Something went wrong', 'error');
    }
  };

  const previewHandler = () => {
    if(isValid) {
      setPreview(getValues());
    } else {
      trigger();
    }
  };

  return (
    <Dialog open={isSecretFormActive} PaperProps={{ sx: { color: 'black', padding: '10px' } }} onClose={formCloseHandler}>
      <DialogTitle component={Typography} variant='h4' textAlign='center'>Add new secret</DialogTitle>
      <Stack gap={4}>
          <Stack component={Form} onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data" method="post" sx={formStyles}>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: 'provide expired date',
                    // validate: (date) => (new Date(date.$d).getTime() - Date.now()) > FIVE_MINUTES || 'date must be at least 5 minutes later from submit time'
                  }}
                  render={({ field }) => {
                    return <DateTimePicker
                      views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                      sx={{ '& .MuiOutlinedInput-input': {color: 'black'} }}
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
              {errors.date && <FormHelperText sx={{ color: 'error.main' }}>{errors.date.message}</FormHelperText>}
            </FormControl>
            <FormControl >
              <InputLabel htmlFor='title' sx={{ color: 'black' }}>Secret's title</InputLabel>
              <Input sx={{ color: 'black' }}
                {...register('title', {
                  maxLength: { value: maxTitleLength, message: 'max size exceeded' },
                  required: 'fill the title',
                  onChange: () => { trigger('title'); }
                })}
                error={!!errors.title}
                multiline
              />
              <FormHelperText error={!!errors.title}>{errors.title ? errors.title.message : `${maxTitleLength - titleText.length} chars left`}</FormHelperText>
            </FormControl>
            <FormControl >
              <InputLabel htmlFor='title' sx={{ color: 'black' }}>Secret's description</InputLabel>
              <Input sx={{ color: 'black' }} {...register('description')} multiline />
            </FormControl>
            <FormControl>
              <Button component='label' startIcon={<UploadFile />} variant="contained">Attach file
                <input type="file" hidden {...register('file', {onChange: (e)=>{trigger();setFileName(e.target?.value);}, required: {value: true, message: 'attach the file'}})} />
              </Button>
              <FormHelperText error={!!errors.file}>{errors.file ? errors.file.message : fileName}</FormHelperText>
            </FormControl>
            <Button color="warning" variant="outlined" onClick={previewHandler}>Get preview</Button>
            <AppButton type='submit'>Submit</AppButton>
          </Stack>
          {preview && <FutureSecret sx={{maxWidth: formStyles.width}} userId={id!} id="1" title={preview.title} availableAt={preview.date.$d} createdAt={new Date().toDateString()} type={ESecretType.DOC} countdownHandler={()=>{}} />}

      </Stack>

    </Dialog>
  );
};
