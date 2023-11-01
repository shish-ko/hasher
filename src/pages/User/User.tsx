import { LoaderFunctionArgs } from "react-router-dom";
import { SecretForm } from "~comps/SecretForm/SecretForm";
import { useAppSelector } from "~utils/hooks";

export const User: React.FC = () => {
  const {id} = useAppSelector((store) => store.user);

  return (
    <SecretForm />
  );
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  // const res = await
  return null;
};
