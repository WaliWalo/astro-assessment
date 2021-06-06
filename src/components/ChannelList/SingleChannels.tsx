import React, { useEffect } from 'react';
import { ISingleChannelsProp } from './types';
import { Image, Spinner } from 'react-bootstrap';
import './styles.css';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useAppSelector, useAppDispatch } from './../../store/setup/store';
import { getFavourites } from './../../store/fav/favSlice';
import { IChannelDetails } from '../../store/channel/types';

function SingleChannels(props: ISingleChannelsProp) {
  let history = useHistory();
  let dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.fav);
  // const [favourites, setFavourites] = useState([])

  useEffect(() => {}, []);

  const addToFav = () => {
    const favArray = JSON.parse(localStorage.getItem('favs')!);
    if (favArray.favs.includes(props.channel.id)) {
      favArray.favs.splice(favArray.favs.indexOf(props.channel.id), 1);
    } else {
      favArray.favs.push(props.channel.id);
    }
    dispatch(getFavourites(favArray.favs));
    localStorage.setItem('favs', JSON.stringify(favArray));
  };

  return (
    <>
      <div id="singleChannelContainer">
        <div id="singleChannelTop">
          <div
            className="col-5"
            onClick={() => history.push(`/channelDetails/${props.channel.id}`)}
          >
            {props.channel.originalImage ? (
              <Image
                src={props.channel.originalImage}
                className="channelImage"
              />
            ) : (
              <Image src={props.channel.backupImage} className="channelImage" />
            )}
          </div>
          <div className="col-7" id="channelTopDetails">
            <span>
              <strong>{props.channel.title}</strong>
            </span>
            <span>CH{props.channel.stbNumber}</span>
            {favs.status === 'loading' ? (
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            ) : (
              <span>
                {favs.data !== undefined &&
                favs.data.length > 0 &&
                favs.data
                  .map((fav: IChannelDetails) => fav.id)
                  .includes(props.channel.id) ? (
                  <HeartFill onClick={addToFav} />
                ) : (
                  <Heart onClick={addToFav} />
                )}
              </span>
            )}
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
      </div>
    </>
  );
}

export default SingleChannels;
