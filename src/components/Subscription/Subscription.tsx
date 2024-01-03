import { Button, Stack, Typography } from "@mui/material";
import { Form, useForm } from "react-hook-form";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppButton } from "~comps/UI_components/Button";
import { AppInput } from "~comps/UI_components/Inputs";

interface ISubscriptionForm {
  email: string
}

export const Subscription: React.FC = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<ISubscriptionForm>();
  return (
    <AppBlock>
      <Typography variant="h3" textAlign='center' color='white'>
        Join the Secret Service’s  Club for insider tips and top-secret promotions. Trust us, you don’t want to miss this!
      </Typography>
      <Stack alignItems='center' gap={3}>
        <form onSubmit={handleSubmit((val) => console.log(val))} className="subscriptionForm">
          <AppInput  {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid e-mail'
            }, required: true
          })} fullWidth/>
          {errors.email && <Typography>{errors.email.message}</Typography>}
          <AppButton fullWidth variant='contained' type="submit">Subscribe </AppButton>
        </form>
      </Stack>
    </AppBlock>
  );
};