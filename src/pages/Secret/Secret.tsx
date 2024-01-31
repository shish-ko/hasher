import { Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { SecretSkeleton } from "~comps/UI_components/Sceletons/SecretSkeleton";
import { IFutureSecret, ISecret, ISecretRes, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";
import { AvailableSecret_L } from "./AvailableSecret_L";
import { get_MOCK_USER_SECRETS } from "~utils/helpers";
import { FutureSecret_L } from "./FutureSecret_L";

export const Secret = () => {
  const { secretId } = useParams();
  // let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId, '/');
  let { res, refetch, setRes } = useServerFetch<ISecretRes<ISecret | IFutureSecret>>(SERVER.SECRET + secretId);
  if (import.meta.env.VITE_AUTH_FREE) {
    res= {
      secret: get_MOCK_USER_SECRETS().futureSecrets[0],
      interaction: { isLiked: true, subscription: false }
    };
  }
  const isAvailableSecret = res?.secret && ('url' in res.secret) && ('description' in res.secret);
  return (
    <AppBlock>
      <Paper elevation={14} component={Stack} gap={4} p={5}>
        {!res ?
          <SecretSkeleton /> :
          isAvailableSecret ?
            <AvailableSecret_L {...res as unknown as ISecretRes<ISecret>} setSecret={setRes} /> :
            <FutureSecret_L countdownHandler={refetch} {...res as unknown as ISecretRes<IFutureSecret>} setSecret={setRes} />
        }
      </Paper>
    </AppBlock>
  );
};
