import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import logo from "../../logo.png";
import "../../CSS/App.css";
import Loading from "../../loading.js";

export default function LocalVideoPreview() {
/*   const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name === 'camera') as LocalVideoTrack;

  return videoTrack ? <VideoTrack track={videoTrack} isLocal /> : null
  return <h1>Matching...</h1> */
  
  return (
    <div className="App">
      <header className="App-header">
        <Loading />
      </header>
    </div>
  );
}
