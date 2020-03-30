import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LocalParticipant, RemoteParticipant, RemoteVideoTrack, LocalVideoTrack } from 'twilio-video';

import BandwidthWarning from '../BandwidthWarning/BandwidthWarning';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublications from '../../hooks/usePublications/usePublications';
import useTrack from '../../hooks/useTrack/useTrack';
import VideocamOff from '@material-ui/icons/VideocamOff';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  isVideoSwitchedOff: {
    '& video': {
      filter: 'blur(4px) grayscale(1) brightness(0.5)',
    },
  },
  identity: {
    background: 'transparent',
    padding: '0.1em 0.3em',
    margin: '1em',
    fontSize: '1.2em',
    display: 'inline-flex',
    '& svg': {
      marginLeft: '0.3em',
    },
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    padding: '0.4em',
    width: '100%',
  },
});

interface MainParticipantInfoProps {
  participant: LocalParticipant | RemoteParticipant;
  children: React.ReactNode;
}

export default function MainParticipantInfo({ participant, children }: MainParticipantInfoProps) {
  const classes = useStyles();

  const publications = usePublications(participant);
  const videoPublication = publications.find(p => p.trackName === 'camera');
  const screenSharePublication = publications.find(p => p.trackName === 'screen');
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as LocalVideoTrack | RemoteVideoTrack);

  return (
      <div className={classes.infoContainer}>
        <h4 className={classes.identity}>
          You're currently speaking to {participant.identity}
        </h4>
      </div>
  );
}
