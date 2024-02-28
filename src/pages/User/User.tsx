import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { SecretsList } from "~comps/Secrets/SecretList";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { IRouterParams, IUserSecrets } from "~interfaces/index";
import { get_MOCK_USER_SECRETS } from "~utils/helpers";
import { useAppSelector, useServerFetch } from "~utils/hooks";

export const User: React.FC = () => {
  const { userId } = useParams<Record<IRouterParams, string>>();
  const { newSecrets } = useAppSelector((state) => state.user);
  const hasPageBeenRendered = useRef(false);
  // eslint-disable-next-line prefer-const
  let { res: secrets, refetch } = useServerFetch<IUserSecrets>(`user/${userId}`, {redirectOnError: '/'});
  if (import.meta.env.VITE_AUTH_FREE) {
    secrets = get_MOCK_USER_SECRETS();
  }
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      refetch();
      return;
    }
    hasPageBeenRendered.current = true;
  }, [newSecrets]);

  return (
    <AppBlock component='section'>
      {secrets ?
        < SecretsList secrets={secrets!} refetch={refetch} />
        :
        <div>loading...</div>}
    </AppBlock>
  );
};
