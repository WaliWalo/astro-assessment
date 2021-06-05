import { IChannel, IChannelsResponse } from '../store/channel/types';

const getAllChannels = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/all.json`);
    if (response.ok) {
      const data: IChannelsResponse = await response.json();
      if (data.responseCode >= 200 && data.responseCode <= 299) {
        return data.response;
      } else {
        console.log(data.responseMessage);
      }
    } else {
      console.log(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};

export async function search(query: string) {
  const channels: Array<IChannel> | undefined = await getAllChannels();
  let filtered = [];
  if (channels !== undefined) {
    if (query.match(/^[0-9]+$/) === null) {
      filtered = channels.filter((channel) =>
        channel.title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filtered = channels.filter((channel) =>
        channel.stbNumber.includes(query)
      );
    }
    return filtered;
  }
}

export async function sortByStbNumber() {
  const channels: Array<IChannel> | undefined = await getAllChannels();

  if (channels !== undefined) {
    let sorted = channels.sort((a, b) => {
      if (a.stbNumber.toUpperCase() < b.stbNumber.toUpperCase()) {
        return -1;
      }
      if (a.stbNumber.toUpperCase() > b.stbNumber.toUpperCase()) {
        return 1;
      }

      return 0;
    });
    return sorted;
  }
}

export async function sortByChannelName() {
  const channels: Array<IChannel> | undefined = await getAllChannels();

  if (channels !== undefined) {
    let sorted = channels.sort((a, b) => {
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
      }
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      }

      return 0;
    });
    return sorted;
  }
}

export async function filterByCategory() {
  const channels: Array<IChannel> | undefined = await getAllChannels();
  let sorted = [];
  if (channels !== undefined) {
  }
}

export async function filterByLanguage() {
  const channels: Array<IChannel> | undefined = await getAllChannels();
  let sorted = [];
  if (channels !== undefined) {
  }
}

export async function filterByResolution() {
  const channels: Array<IChannel> | undefined = await getAllChannels();
  let sorted = [];
  if (channels !== undefined) {
  }
}
