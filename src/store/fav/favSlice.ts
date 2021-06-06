import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChannelDetails, IChannelDetailsResponse } from '../channel/types';
import { AppDispatch } from '../setup/store';
// https://redux-toolkit.js.org/usage/usage-with-typescript

// types of state the slice could be in
type SliceState =
  | { status: 'loading' }
  | { status: 'finished'; data: Array<IChannelDetails> }
  | { status: 'error'; error: string };

// initial state of slice
const initialState: SliceState = { status: 'loading' } as SliceState;

// creates the slice and reducers
const favSlice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    setFavs: (state, action: PayloadAction<Array<IChannelDetails>>) =>
      (state = { status: 'finished', data: action.payload }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
  },
});

// Thunk function to allow us to perform async logic to get favourites
export const getFavourites =
  (channelIds: Array<number>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      let favourites: Array<IChannelDetails> = [];
      if (channelIds.length > 0) {
        channelIds.forEach(async (channelId) => {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/${channelId}.json`
          );
          if (response.ok) {
            const data: IChannelDetailsResponse = await response.json();
            if (data.responseCode >= 200 && data.responseCode <= 299) {
              favourites = [...favourites, data.response];
              dispatch(setFavs(favourites));
            } else {
              dispatch(setError(data.responseMessage));
            }
          } else {
            dispatch(setError(response.statusText));
          }
        });
      } else {
        dispatch(setFavs([]));
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

// Extract the action creators object and the reducer
const { actions, reducer } = favSlice;
// Extract and export each action creator by name
export const { setFavs, setError, setLoading } = actions;
// Export the reducer, either as a default or named export
export default reducer;
