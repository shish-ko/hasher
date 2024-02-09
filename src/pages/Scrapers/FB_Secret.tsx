import { LoaderFunction, useLoaderData, useParams } from "react-router-dom";
import { serverAPI } from "~utils/axios";
import { Helmet } from 'react-helmet';
import { ISecret } from "~interfaces/index";

export const FB_Secret =() => {
  const secret = useLoaderData() as Omit<ISecret, 'url' | 'countdownHandler'>;
  const { secretId } = useParams();
  return (
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`localhost:5173/secret/${secretId}`}/>
      <meta property="og:title" content={secret.title}/>
      <meta property="og:description" content={`Hidden ${secret.type.toLowerCase()} will be available at ${secret.availableAt}.`}/>
    </Helmet>
  );
};

export const loader: LoaderFunction = async ({params}): Promise<Omit<ISecret, "url">> => {
  // const { data } = await serverAPI.get(`fbscraper/secret/${params.secretId}`);
  return {title: 'qweqweqwewqe', type: 'VIDEO'} ;
};

