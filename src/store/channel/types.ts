// Generated with quicktype
// https://app.quicktype.io/
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
  currentSchedule: ICurrentSchedule[];
}

export interface ICurrentSchedule {
  eventId: string;
  title: string;
  programmeId: null | string;
  episodeId: null | string;
  datetime: Date;
  datetimeInUtc: Date;
  duration: string;
  siTrafficKey: string;
  detailUrl: string;
}
