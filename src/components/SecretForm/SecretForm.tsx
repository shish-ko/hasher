import { SERVER_URL } from "constants";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISecretForm } from "~interfaces/index";
import { serverAPI } from "~utils/axios";

export const SecretForm: React.FC = () => {
  const { register, handleSubmit } = useForm<ISecretForm>();
  const submitHandler: SubmitHandler<ISecretForm> = async (data) => {
    const availableAt = new Date(data.date + 'T' + data.time).toUTCString();
    const formData= new FormData();
    formData.append('availableAt', availableAt);
    formData.append('file', data.file);
    await serverAPI.post(SERVER_URL + 'secret', formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="secret-form">
      <input {...register('date')} type={"date"} />
      <input {...register('time')} type={"time"} />
      <input {...register('file')} type={"file"} />
      <button>Submit</button>
    </form>
  );
};
