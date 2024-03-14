import { LoaderFunction, useLoaderData, useParams } from "react-router-dom";
import { serverAPI } from "~utils/axios";
import { Helmet } from 'react-helmet';
import { IFutureSecret } from "~interfaces/index";
import { APP_URL_ORIGIN } from "app_constants";
import { getSecretTypeImageURL } from "~utils/helpers";

export const FB_Secret =() => {
  const secret = useLoaderData() as IFutureSecret;
  const { secretId } = useParams();
  return (
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP_URL_ORIGIN}/secret/${secretId}`}/>
      <meta property="og:title" content={secret.title}/>
      <meta property="og:description" content={`Hidden ${secret.type.toLowerCase()} will be available at ${new Date(secret.availableAt).toLocaleString()}`}/>
      <meta property="og:image" content={getSecretTypeImageURL(secret.type)} />
    </Helmet>
  );
};

export const loader: LoaderFunction = async ({params}): Promise<IFutureSecret> => {
  const { data } = await serverAPI.get<IFutureSecret>(`secret/scraper/${params.secretId}`);
  console.log(data);
  return data;
};

