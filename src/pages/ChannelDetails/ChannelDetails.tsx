import React from 'react';
import { RouteComponentProps } from 'react-router';
type TParams = { id: string };
function ChannelDetails({ match }: RouteComponentProps<TParams>) {
  return <div>DETAILS {match.params.id}</div>;
}

export default ChannelDetails;
