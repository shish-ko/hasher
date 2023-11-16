import { SERVER_URL } from "constants";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Form } from "react-router-dom";

export const SecretForm: React.FC = () => {
  const { register, handleSubmit, control } = useForm<ISecretForm>();
  const submitHandler: SubmitHandler<ISecretForm> = async ({ date, file, title }) => {
    const availableAt = new Date(date).toISOString();
    const formData= new FormData();
    formData.append('availableAt', availableAt);
    formData.append('file', file[0]);
    formData.append('title', title);
    const res = await serverAPI.post(SERVER_URL + 'secret', formData);
    console.log(res);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} className="secret-form" encType="multipart/form-data" method="post">
      <h2 className="secret-form__title">Create a new secret</h2>
      <label htmlFor="date">Enter the date</label>
      <Controller
        name="date"
        control={control}
        render={({field})=> <DateTimePicker maxDetail="second" className='dateTimePicker' minDate={new Date()} {...field}/>} 
      />
      <label htmlFor="title">Provide title</label>
      <input type="text" {...register('title')}/>
      <label htmlFor="file">Attach file</label>
      <input {...register('file')} type={"file"} />
      <button>Submit</button>
    </Form>
  );
};
