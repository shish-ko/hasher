import { LOADER_COLOR } from "constants";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { AvailableSecret } from "~comps/Secrets/AvailableSecret";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { IFutureSecret, ISecret, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";

export const Secret = () => {
  const { secretId } = useParams();
  const { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId, '/');
  const isAvailableSecret = res && ('url' in res) && ('description' in res);
  return (
    <AppBlock>
      {
        res ?          
          isAvailableSecret ? <AvailableSecret {...res} /> : <></>          
          :
          <></>
      }
    </AppBlock>
  );
};
