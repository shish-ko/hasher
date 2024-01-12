import { Pause, PlayArrow,  VolumeUp } from "@mui/icons-material";
import { Collapse, IconButton, Slider, Stack } from "@mui/material";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { SERVER_URL } from "constants";
import React, { useEffect, useRef, useState } from "react";

interface IAppAudioPlayerProps {
  renderTo: React.RefObject<HTMLDivElement>;
  url: string;
}

export const AppAudioPlayer: React.FC<IAppAudioPlayerProps> = ({ renderTo, url }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioNode, setAudioNode] = useState<MediaElementAudioSourceNode>();
  const [isPLaying, setIsPlaying] = useState(false);
  const [isVolumeShown, setIsVolumeShown] = useState(false);

  const playHandler = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };
  const pauseHandler = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };
  audioRef.current?.addEventListener('ended', () => { // TODO check either eventListener is a good idea in React 
    setIsPlaying(false);
  });

  useEffect(() => {
    let audioMotion: AudioMotionAnalyzer;
    if (renderTo.current && audioRef.current) {
      if (!audioNode) {
        const context = new AudioContext();
        const audioNode = context.createMediaElementSource(audioRef.current);
        setAudioNode(audioNode);
      }
      audioMotion = new AudioMotionAnalyzer(
        renderTo.current,
        {
          source: audioNode,
          height: 200,
          mode: 3,
          barSpace: .6,
          lumiBars: true,
          showScaleX: false,
        }
      );
    }
    return () => {
      audioMotion?.destroy();
    };
  }, [audioRef, renderTo, audioNode]);
  return (
    <>
      <audio ref={audioRef} src={SERVER_URL + url} crossOrigin="anonymous" />
      <Stack direction='row' justifyContent='space-between' sx={{ position: 'absolute', bottom: '7px', left: 0, width: '100%' }}>
        {
          isPLaying ?
            <IconButton sx={{ '&:hover': { backgroundColor: 'rgba(225,225,225, .2)' } }} onClick={pauseHandler}><Pause htmlColor="white" /></IconButton> :
            <IconButton sx={{ '&:hover': { backgroundColor: 'rgba(225,225,225, .2)' } }} onClick={playHandler}><PlayArrow htmlColor="white" /></IconButton>
        }
        <Stack direction='row' alignItems='baseline' gap={2} onMouseOver={() => setIsVolumeShown(true)} onMouseLeave={() => setIsVolumeShown(false)}>
          <Collapse orientation="horizontal" in={isVolumeShown}>
            <Slider size="small" sx={{width: '100px', transform: 'translateY(2px)'}} 
            onChange={(_, val)=> {if(audioRef.current && typeof val === 'number') {
              console.log(val/100);
              audioRef.current.volume = val/100;}}}
            ></Slider>
          </Collapse>
          <IconButton><VolumeUp htmlColor="white" /></IconButton>
        </Stack>
      </Stack>
    </>
  );
};
