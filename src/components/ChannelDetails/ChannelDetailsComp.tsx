import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import { ISchedule } from '../../store/channel/types';
import { IChannelDetailsProps } from './types';
import './styles.css';
// https://momentjs.com/
function ChannelDetailsComp(props: IChannelDetailsProps) {
  const [schedule, setSchedule] = useState<Array<ISchedule> | null>(null);

  useEffect(() => {
    if (props.channel.schedule) {
      setSchedule(
        props.channel.schedule[moment().format('YYYY-MM-DD')].filter(
          (times) => moment(times.datetime) > moment()
        )
      );
    }
  }, [props.channel.schedule]);

  return (
    <div className="mt-2">
      <div id="detailsTitleContainer">
        <div>
          <Image src={props.channel.originalImage} />
        </div>
        <div id="detailsTitle">
          <span>CH{props.channel.stbNumber}</span>
          <span>
            <strong>{props.channel.title}</strong>
          </span>
        </div>
      </div>
      <div id="detailsDescription">{props.channel.description}</div>
      <div id="daysContainer">
        {props.channel.schedule && (
          <>
            {Object.keys(props.channel.schedule).map((key) => {
              return (
                <span
                  key={key}
                  onClick={() =>
                    setSchedule(
                      props.channel.schedule[
                        moment(key).format('YYYY-MM-DD')
                      ].filter((times) => moment(times.datetime) > moment())
                    )
                  }
                  className="mx-2"
                >
                  <Button variant="light">{moment(key).format('dddd')}</Button>
                </span>
              );
            })}
          </>
        )}
      </div>
      <div id="timesTableContainer">
        <Table striped bordered hover>
          <tbody>
            {schedule &&
              schedule.map((times: ISchedule) => {
                return (
                  <tr key={times.eventId}>
                    <td>{times.datetime.toString().substr(11, 5)}</td>
                    <td>{times.title}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ChannelDetailsComp;
