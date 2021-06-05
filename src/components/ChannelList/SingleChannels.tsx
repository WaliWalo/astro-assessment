import React, { useEffect } from 'react';
import { ISingleChannelsProp } from './types';
import { Image } from 'react-bootstrap';
import './styles.css';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Heart } from 'react-bootstrap-icons';
import { useAppSelector, useAppDispatch } from './../../store/setup/store';
import { getFavourites } from './../../store/fav/favSlice';

function SingleChannels(props: ISingleChannelsProp) {
  let history = useHistory();
  let dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.fav);

  useEffect(() => {
    // dispatch(getFavourites());
    console.log(localStorage.getItem('favs'));
    if (localStorage.getItem('favs') === null) {
      const newFavs = { favs: [] };
      localStorage.setItem('favs', JSON.stringify(newFavs));
    }
  }, []);

  const addToFav = () => {};

  return (
    <div
      id="singleChannelContainer"
      onClick={() => history.push(`/channelDetails/${props.channel.id}`)}
    >
      <div id="singleChannelTop">
        <div className="col-5">
          {props.channel.originalImage ? (
            <Image src={props.channel.originalImage} className="channelImage" />
          ) : (
            <Image src={props.channel.backupImage} className="channelImage" />
          )}
        </div>
        <div className="col-7" id="channelTopDetails">
          <span>
            <strong>{props.channel.title}</strong>
          </span>
          <span>CH{props.channel.stbNumber}</span>
          <span>
            <Heart onClick={addToFav} />
          </span>
        </div>
      </div>
      <hr></hr>
      <div id="singleChannelBot">
        <div>
          <div>
            <Table hover id="singleChannelTable">
              <tbody>
                <tr>
                  <td>Now</td>
                  <td>
                    {props.channel.currentSchedule.length > 0 ? (
                      props.channel.currentSchedule[0].title
                    ) : (
                      <span>No Information</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {props.channel.currentSchedule.length > 1 ? (
                      props.channel.currentSchedule[1].datetime
                        .toString()
                        .substr(11, 5)
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    {props.channel.currentSchedule.length > 1 ? (
                      <span>{props.channel.currentSchedule[1].title}</span>
                    ) : (
                      <span>No Information</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {props.channel.currentSchedule.length > 2 ? (
                      props.channel.currentSchedule[2].datetime
                        .toString()
                        .substr(11, 5)
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    {props.channel.currentSchedule.length > 2 ? (
                      props.channel.currentSchedule[2].title
                    ) : (
                      <span>No Information</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {/* <Link to={`/channelDetails/${props.channel.id}`}>Topics</Link> */}
    </div>
  );
}

export default SingleChannels;
