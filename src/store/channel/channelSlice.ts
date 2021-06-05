import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';
import {
  IChannel,
  IChannelsResponse,
  IChannelDetails,
  IChannelDetailsResponse,
} from './types';
// https://redux-toolkit.js.org/usage/usage-with-typescript

// types of state the slice could be in
type SliceState =
  | { status: 'loading' }
  | { status: 'finished'; data: Array<IChannel> | IChannelDetails }
  | { status: 'error'; error: string };

// initial state of slice
const initialState: SliceState = { status: 'loading' } as SliceState;

// creates the slice and reducers
const channelSlice = createSlice({
  name: 'channels',
  initialState: initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Array<IChannel>>) =>
      (state = { status: 'finished', data: action.payload }),
    setChannelDetails: (state, action: PayloadAction<IChannelDetails>) =>
      (state = { status: 'finished', data: action.payload }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
  },
});

// Thunk function to allow us to perform async logic for getting all channels
export const getAllChannels = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${process.env.API_URL}/all.json`);
    if (response.ok) {
      const data: IChannelsResponse = await response.json();
      if (data.responseCode >= 200 && data.responseCode <= 299) {
        dispatch(setChannels(data.response));
      } else {
        dispatch(setError(data.responseMessage));
      }
    } else {
      dispatch(setError(response.statusText));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

// Thunk function to allow us to perform async logic for getting channel details
export const getChannelDetails =
  (channelId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response = await fetch(`${process.env.API_URL}/${channelId}.json`);
      if (response.ok) {
        const data: IChannelDetailsResponse = await response.json();
        if (data.responseCode >= 200 && data.responseCode <= 299) {
          dispatch(setChannelDetails(data.response));
        } else {
          dispatch(setError(data.responseMessage));
        }
      } else {
        dispatch(setError(response.statusText));
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

// Extract the action creators object and the reducer
const { actions, reducer } = channelSlice;
// Extract and export each action creator by name
export const { setChannels, setError, setLoading, setChannelDetails } = actions;
// Export the reducer, either as a default or named export
export default reducer;
