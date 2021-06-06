import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { getAllChannels } from '../../store/channel/channelSlice';
import { IChannel } from '../../store/channel/types';
import { getFavourites } from '../../store/fav/favSlice';
import { useAppDispatch } from '../../store/setup/store';
import { useAppSelector } from './../../store/setup/store';
import SingleChannels from './SingleChannels';
// https://react-bootstrap.github.io/

function ChannelList() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector((state) => state.channels);
  useEffect(() => {
    dispatch(getAllChannels());
    if (localStorage.getItem('favs') === null) {
      const newFavs = { favs: [] };
      localStorage.setItem('favs', JSON.stringify(newFavs));
      dispatch(getFavourites([]));
    } else {
      const favs = JSON.parse(localStorage.getItem('favs')!).favs;
      dispatch(getFavourites(favs));
    }
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
              {channels.data.length > 0 ? (
                channels.data.map((channel: IChannel) => (
                  <Col key={channel.id}>
                    <SingleChannels channel={channel} key={channel.id} />
                  </Col>
                ))
              ) : (
                <h1>Sorry nothing found</h1>
              )}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default ChannelList;
