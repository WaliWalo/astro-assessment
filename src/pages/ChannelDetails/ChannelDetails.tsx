import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import ChannelDetailsComp from '../../components/ChannelDetails/ChannelDetailsComp';
import { getChannelDetails } from '../../store/channel/channelSlice';
import { useAppDispatch } from '../../store/setup/store';
import { useAppSelector } from './../../store/setup/store';
type TParams = { id: string };

function ChannelDetails({ match }: RouteComponentProps<TParams>) {
  const dispatch = useAppDispatch();
  const channel = useAppSelector((state) => state.channels);
  useEffect(() => {
    dispatch(getChannelDetails(parseInt(match.params.id)));
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {channel.status === 'loading' ? (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      ) : (
        <>{channel.data && <ChannelDetailsComp channel={channel.data} />}</>
      )}
    </Container>
  );
}

export default ChannelDetails;
