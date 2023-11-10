import { SERVER_URL } from "constants";
import { LoaderFunctionArgs, useLoaderData, Navigate, useParams } from "react-router-dom";
import { SecretForm } from "~comps/SecretForm/SecretForm";
import { SecretsList } from "~comps/Secrets/SecretList";
import { IRouterParams, ISecret } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppSelector, usePopUp } from "~utils/hooks";

export const User: React.FC = () => {
  const { id } = useAppSelector((store) => store.user);
  const { userId } = useParams<Record<IRouterParams, string>>();
  const secrets = useLoaderData() as ISecret[] | undefined;
  const showPopUp = usePopUp();
  if (!secrets) {
    showPopUp('User not found', 'alert');
  }
  return (
    secrets ?
      <section className="secret-container">
        {id === +userId! && <SecretForm />}
        < SecretsList secrets={secrets!} />
      </section > : 
      <Navigate to={'/'} />
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const res = await serverAPI.get(SERVER_URL + `user/${params.userId}`);
    console.log(res);
    return res.data;
  } catch {
    return null;
  }
};
