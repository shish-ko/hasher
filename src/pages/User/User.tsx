import { SERVER_URL } from "constants";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useParams } from "react-router-dom";
import { SecretsList } from "~comps/Secrets/SecretList";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { IRouterParams, ISecret } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { get_MOCK_USER_SECRETS } from "~utils/helpers";
import { useAppSelector, usePopUp, useServerFetch } from "~utils/hooks";

export const User: React.FC = () => {
  const { userId } = useParams<Record<IRouterParams, string>>();
  // eslint-disable-next-line prefer-const
  let {res: secrets, refetch} = useServerFetch<ISecret[]>(`user/${userId}`);
  const { newSecrets } = useAppSelector((state) => state.user);
  if (import.meta.env.VITE_AUTH_FREE) {
    secrets = get_MOCK_USER_SECRETS();
  }
  useEffect(()=> {refetch();}, [newSecrets]);

  return (
    <AppBlock>
      {secrets ?
        < SecretsList secrets={secrets!} expiredSecretHandler={refetch} />
        :
        <div>loading...</div>}
    </AppBlock>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log('user ' + Date.now());
  try {
    const res = await serverAPI.get(SERVER_URL + `user/${params.userId}`);
    return res.data;
  } catch {
    return null;
  }
};
