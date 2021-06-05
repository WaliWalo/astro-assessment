import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { getAllChannels } from '../../store/channel/channelSlice';
import { IChannel } from '../../store/channel/types';
import { useAppDispatch } from '../../store/setup/store';
import { useAppSelector } from './../../store/setup/store';
import SingleChannels from './SingleChannels';
// https://react-bootstrap.github.io/

function ChannelList() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector((state) => state.channels);
  useEffect(() => {
    dispatch(getAllChannels());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {channels.status === 'loading' ? (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      ) : (
        <>
          <Container>
            <Row>
              {channels.data.length > 0 &&
                channels.data.map((channel: IChannel) => (
                  <Col key={channel.id}>
                    <SingleChannels channel={channel} key={channel.id} />
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default ChannelList;
