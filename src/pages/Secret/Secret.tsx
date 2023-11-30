import { useParams, useRevalidator } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { ISecret, SERVER } from "~interfaces/index";
import { getSecretComponent } from "~utils/helpers";
import { useServerFetch } from "~utils/hooks";

export const  Secret = () => {
  const {secretId} = useParams();
  const secret = useServerFetch<ISecret>(SERVER.SECRET + secretId);
  const reload = useRevalidator();
  return(
   secret ? 
    <>
      {getSecretComponent(secret, ()=>{reload.revalidate();})}
    
    </>
    :
    <PropagateLoader />
  );
};
