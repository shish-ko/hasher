import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Form } from "react-router-dom";
import { FIVE_MINUTES } from "constants";
import { usePopUp } from "~utils/hooks";

interface ISecretFormProps {
  formCloseHandler: ()=> void
}
export const SecretForm: React.FC<ISecretFormProps> = ({formCloseHandler}) => {
  const { register, handleSubmit, control, formState: {errors} } = useForm<ISecretForm>();
  const showPopUp = usePopUp();
  const submitHandler: SubmitHandler<ISecretForm> = async ({ date, file, title }) => {
    try {
      const availableAt = new Date(date).toISOString();
      const formData= new FormData();
      formData.append('availableAt', availableAt);
      formData.append('file', file[0]);
      formData.append('title', title);
      await serverAPI.post('secret', formData);
      formCloseHandler();
      showPopUp('Secret has been added', 'info');
    } catch {
      showPopUp('Something went wrong', 'error');
    }

  };

  return (
    <Form  onSubmit={handleSubmit(submitHandler)} className="secret-form" encType="multipart/form-data" method="post">
      <h2 className="secret-form__title">Create a new secret</h2>
      <label htmlFor="date">Enter the date</label>
      <Controller
        name="date"
        control={control}
        // rules={{validate: (date) => (+date - Date.now()) > FIVE_MINUTES || 'Date must be at least 5 minutes later from now'}}
        render={({field})=> <DateTimePicker maxDetail="second" className='dateTimePicker' minDate={new Date()} {...field}/>} 
      />
      {errors.date && <span className="secret-form__error">{errors.date.message}</span>}
      <label htmlFor="title">Provide title</label>
      <input type="text" {...register('title')}/>
      <label htmlFor="file">Attach file</label>
      <input {...register('file', {required: true})} type={"file"} />
      {errors.file && <span className="secret-form__error">File isn't attached</span>}
      <button>Submit</button>
    </Form>
  );
};
