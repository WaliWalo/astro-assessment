// Generated with quicktype
// https://app.quicktype.io/

export interface IChannelsResponse {
  responseCode: number;
  responseMessage: string;
  response: Array<IChannel>;
}

export interface IChannel {
  id: number;
  title: string;
  description: string;
  isHd: boolean;
  stbNumber: string;
  language: string;
  category: string;
  originalImage: string;
  backupImage: string;
  imageUrl: string;
  isAstroGoExclusive: boolean;
  filters: string[];
  detailUrl: string;
  currentSchedule: ISchedule[];
}

export interface IChannelDetailsResponse {
  responseCode: number;
  responseMessage: string;
  response: IChannelDetails;
}

export interface IChannelDetails {
  id: number;
  title: string;
  description: string;
  isHd: boolean;
  stbNumber: string;
  language: string;
  category: string;
  originalImage: string;
  backupImage: string;
  imageUrl: string;
  isAstroGoExclusive: boolean;
  filters: string[];
  schedule: { [key: string]: ISchedule[] };
}

export interface ISchedule {
  eventId: string;
  title: string;
  programmeId: null | number;
  episodeId: null | number;
  datetime: Date;
  datetimeInUtc: Date;
  duration: string;
  siTrafficKey: string;
  detailUrl: string;
}
