import { SERVER_URL } from "constants";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, Navigate, useParams, useNavigate } from "react-router-dom";
import { SecretForm } from "~comps/SecretForm/SecretForm";
import { SecretsList } from "~comps/Secrets/SecretList";
import { IRouterParams, ISecret } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppSelector, usePopUp } from "~utils/hooks";

export const User: React.FC = () => {
  const { id } = useAppSelector((store) => store.user);
  const { userId } = useParams<Record<IRouterParams, string>>();
  const [secrets, setSecrets] = useState<ISecret[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  useEffect( () => {
    async function secretFetcher() {
      try {
        setIsFetching(true);
        const userSecrets = await serverAPI.get<ISecret[]>(`user/${userId}`);
        setSecrets(userSecrets.data);
        setIsFetching(false);
      } catch {
        showPopUp('User not found', 'alert');
        navigate('/');
      }
    }
    secretFetcher();
  }, [userId]);
  return (
    !isFetching ?
      <section className="secret-container">
        {id === +userId! && <SecretForm />}
        < SecretsList secrets={secrets!} />
      </section >  :
      <div>loading...</div>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log('user '+ Date.now());
  try {
    const res = await serverAPI.get(SERVER_URL + `user/${params.userId}`);
    return res.data;
  } catch {
    return null;
  }
};
