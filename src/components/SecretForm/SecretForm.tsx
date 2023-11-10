import { SERVER_URL } from "constants";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const SecretForm: React.FC = () => {
  const { register, handleSubmit, control } = useForm<ISecretForm>();
  const submitHandler: SubmitHandler<ISecretForm> = async ({ date, file }) => {
    const availableAt = new Date(date).toISOString();
    const formData= new FormData();
    formData.append('availableAt', availableAt);
    formData.append('file', file[0]);
    console.log(availableAt);
    const res = await serverAPI.post(SERVER_URL + 'secret', formData);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="secret-form" encType="multipart/form-data">
      <Controller
        name="date"
        control={control}
        render={({field})=> <DateTimePicker maxDetail="second" className='dateTimePicker' minDate={new Date()} {...field}/>} 
      />
      <input {...register('file')} type={"file"} />
      <button>Submit</button>
    </form>
  );
};
