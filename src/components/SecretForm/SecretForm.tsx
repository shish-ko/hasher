import { CSSProperties, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { Form, useLocation } from "react-router-dom";
import { ONE_MINUTE } from "app_constants";
import { useAppDispatch, useAppSelector, usePopUp } from "~utils/hooks";
import { Button, Dialog, DialogTitle, FormControl, FormHelperText, Input, InputLabel, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import * as datePicker from '@mui/x-date-pickers/AdapterDayjs';
const { AdapterDayjs } = datePicker;
import dayjs from "dayjs";
import { AppButton } from "~comps/UI_components/Button";
import { UploadFile } from "@mui/icons-material";
import { FutureSecret } from "~comps/Secrets/FutureSecret";
import { addNewSecret } from "store/userSlice";
import { fileTypeChecker, fileValidator } from "~utils/helpers";

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
  const { id, name, userPic } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const showPopUp = usePopUp();
  const url = useLocation();
  const maxTitleLength = 70;
  const minDate = dayjs().add(2, 'minute');
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
        dispatch(addNewSecret());
      }
    } catch {
      showPopUp('Something went wrong', 'error');
    }
  };

  const previewHandler = () => {
    if (isValid) {
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
                  validate: (date) => (new Date(date.$d).getTime() - Date.now()) > (2 * ONE_MINUTE) || 'date must be at least 2 minutes later from submit time'
                }}
                render={({ field }) => {
                  return <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    sx={{ '& .MuiOutlinedInput-input': { color: 'black' } }}
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
              <input type="file" hidden {...register('file', { onChange: (e) => { trigger(); setFileName(e.target?.value); }, required: { value: true, message: 'Attach the file' }, validate: fileValidator })} />
            </Button>
            <FormHelperText error={!!errors.file}>{errors.file ? errors.file.message : fileName}</FormHelperText>
          </FormControl>
          <Button color="warning" variant="outlined" onClick={previewHandler}>Get preview</Button>
          <AppButton type='submit'>Submit</AppButton>
        </Stack>
        {preview &&
          <FutureSecret
            secret={{
              user: { id, name, userPic },
              id: '1',
              title: preview.title,
              availableAt: preview.date.$d,
              userId: id!,
              createdAt: new Date().toDateString(),
              type: fileTypeChecker(preview.file![0]),
              views: 0,
              url: null,
              description: null,
              isRescrapedByFB: false,
              isRescrapedByTwitter: false,
              isRescrapedByInst: false,
            }}
            sx={{ maxWidth: formStyles.width }}
            countdownHandler={() => { }}
          />}

      </Stack>

    </Dialog>
  );
};
