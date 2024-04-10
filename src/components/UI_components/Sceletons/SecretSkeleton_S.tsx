import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Skeleton } from "@mui/material";
import { SECRET_S_MEDIA_HEIGHT } from "app_constants";

export const SecretSkeleton_S: React.FC = () => {
  return (
    <Card sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={4}>
      <CardHeader
        title={<Skeleton width={60}/>}
        subheader={<Skeleton width={140}/>}
        avatar={<Skeleton variant='circular' width={40} height={40}/>}
      />
      <CardMedia sx={{ position: 'relative', height: `${SECRET_S_MEDIA_HEIGHT}px`, overflow: 'hidden' }}>
        <Skeleton variant='rounded' width={'100%'} height={SECRET_S_MEDIA_HEIGHT} />
      </CardMedia>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Skeleton variant='rounded' width={'100%'} height={40} />
          <Skeleton width={'100%'} height={20}/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Skeleton variant="circular" width={40} height={40}/>
      </CardActions>
    </Card>
  );
};
