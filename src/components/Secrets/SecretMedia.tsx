import { Box, Typography } from "@mui/material";
import { ESecretType } from "~interfaces/index";
import { AppAudioPlayer } from "./AudioSecret";
import { PhotoSecret } from "./PhotoSecret";
import { DocSecret } from "./DocSecret";
import { COLORS } from "style/colors";
import Countdown from "react-countdown";
import { countdownRenderer } from "~utils/helpers";
import { VideoSecret } from "./VideoSecret";

interface ISecretMediaProps {
  type: ESecretType;
  availableAt: string;
  url: string | null;
  countdownHandler: () => void 
}

export const SecretMedia: React.FC<ISecretMediaProps> = ({ type, url, availableAt ,countdownHandler }) => {
  if (url) {
    return (
      <Box sx={{ position: 'relative' }}>
        {
          (function () {
            switch (type) {
              case 'AUDIO':
                return <AppAudioPlayer url={url} />;
              case 'VIDEO':
                return <VideoSecret url={url} large/>;
              case 'PHOTO':
                return <PhotoSecret url={url} large/>;
              default:
                return <DocSecret url={url} />;
            }
          })()
        }
      </Box>
    );
  } else {
    return (
      <Box sx={{ backgroundColor: 'black', padding: '40px  0' }}>
        <Typography textAlign='center' mb={5} color={COLORS.lightText}>
          <Typography component='span' textTransform='capitalize' >{type} </Typography>
          will be available in:
        </Typography>
        <Countdown zeroPadTime={2} intervalDelay={80} precision={2} date={availableAt} onComplete={countdownHandler} renderer={countdownRenderer({ fontSize: '10rem' })} />
      </Box>
    );
  }
};
