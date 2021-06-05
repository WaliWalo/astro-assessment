import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ISchedule } from '../../store/channel/types';
import { IChannelDetailsProps } from './types';
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
    <div>
      <div>{props.channel.title}</div>
      <div>{props.channel.description}</div>
      <div>
        {props.channel.schedule && (
          <>
            {Object.keys(props.channel.schedule).map((key) => {
              return (
                <span
                  onClick={() =>
                    setSchedule(
                      props.channel.schedule[
                        moment(key).format('YYYY-MM-DD')
                      ].filter((times) => moment(times.datetime) > moment())
                    )
                  }
                >
                  {moment(key).format('dddd')}
                </span>
              );
            })}
          </>
        )}
      </div>
      <div>
        <Table striped bordered hover>
          <tbody>
            {schedule &&
              schedule.map((times: ISchedule) => {
                return (
                  <tr>
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
