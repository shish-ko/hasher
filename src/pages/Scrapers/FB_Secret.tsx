import { LoaderFunction, useLoaderData } from "react-router-dom";
import { serverAPI } from "~utils/axios";
import { Helmet } from 'react-helmet';
import { IFutureSecret, ISecret } from "~interfaces/index";
import { APP_URL_ORIGIN } from "app_constants";
import { getSecretTypeImageURL } from "~utils/helpers";

export const FB_Secret =() => {
  const secret = useLoaderData() as IFutureSecret | ISecret;
  return (
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP_URL_ORIGIN}/secret/${secret.id}`}/>
      <meta property="og:title" content={secret.title}/>
      <meta property="og:description" content={getSecretDescription(secret)}/>
      <meta property="og:image" content={getSecretTypeImageURL(secret.type)} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={secret.title} />
      <meta name="twitter:description" content={getSecretDescription(secret)} />
      <meta name="twitter:image" content={getSecretTypeImageURL(secret.type)} />
    </Helmet>
  );
};

export const loader: LoaderFunction = async ({params}): Promise<IFutureSecret> => {
  const { data } = await serverAPI.get<IFutureSecret>(`secret/scraper/${params.secretId}`);
  return data;
};

function getSecretDescription(secret: ISecret | IFutureSecret) {
  if(secret.url) {
    return `You can watch the shared ${secret.type.toLowerCase()} on ${APP_URL_ORIGIN}`;
  } 
  return `You can subscribe to the shared ${secret.type.toLowerCase()} on ${APP_URL_ORIGIN} and receive e-mail notification when it become available`;
}

