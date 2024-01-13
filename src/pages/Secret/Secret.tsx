import { LOADER_COLOR } from "constants";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { ISecret, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";

export const  Secret = () => {
  const {secretId} = useParams();
  const {res, refetch}  = useServerFetch<ISecret>(SERVER.SECRET + secretId, '/');
  return(
    res ? 
    <>
      {/* {getSecretComponent(res, refetch)} */}
    </>
    :
    <PropagateLoader color={LOADER_COLOR} size={23} />
  );
};
