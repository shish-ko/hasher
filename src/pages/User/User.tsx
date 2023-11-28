import { SERVER_URL } from "constants";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useParams, useNavigate } from "react-router-dom";
import { SecretsList } from "~comps/Secrets/SecretList";
import { IRouterParams, ISecret } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppSelector, usePopUp } from "~utils/hooks";

export const User: React.FC = () => {
  const { userId } = useParams<Record<IRouterParams, string>>();
  const [secrets, setSecrets] = useState<ISecret[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [expiredSecrets, setExpiredSecrets] = useState(0);
  const { newSecrets } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const expiredSecretHandler = () => {
    setExpiredSecrets(expiredSecrets + 1);
  };

  useEffect(() => {
    async function secretFetcher() {
      try {
        setIsFetching(true);
        const userSecrets = await serverAPI.get<ISecret[]>(`user/${userId}`);
        setSecrets(userSecrets.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        showPopUp('User not found', 'alert');
        navigate('/');
      }
    }
    secretFetcher();
  }, [userId, expiredSecrets, newSecrets]);
  return (
    <>
      
      <button onClick={()=>{FB.ui({
  method: 'share',
  href: 'https://youtube.com/',
}, function(response){console.log(response.error_code)});}}>Share</button>
      {!isFetching ?
      < SecretsList secrets={secrets!} expiredSecretHandler={expiredSecretHandler} />
      :
      <div>loading...</div>}
    </>
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
