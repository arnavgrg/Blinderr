import React from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';

const Container = styled('div')({
  position: 'relative',
  height: '100%',
});

const MainParticipantContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 10,
  right: 10,
  top: 10,
  bottom: 10,
  '& > div': {
    height: '100%',
  },
}));

export default function Room() {
  return (
    <Container>
      <MainParticipantContainer>
        <MainParticipant />
      </MainParticipantContainer>
        <ParticipantStrip />
        
    </Container>
  );
}
