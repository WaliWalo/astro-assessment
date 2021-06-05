import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';
import { IChannel } from './types';
// https://redux-toolkit.js.org/usage/usage-with-typescript

// types of state the slice could be in
type SliceState =
  | { status: 'loading' }
  | { status: 'finished'; data: Array<IChannel> }
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
    unsetChannels: (state) => (state = { status: 'finished', data: [] }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
  },
});

// Thunk function to allow us to perform async logic.
export const getRandomRecipesAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/cocktails`
    );
    if (response.ok) {
      dispatch(setChannels(await response.json()));
    } else {
      const error = { status: response.status, message: response.statusText };
      dispatch(setError(error));
    }
  } catch (error) {
    const err = { status: 500, message: 'Please try again later' };
    dispatch(setError(err));
  }
};

// Extract the action creators object and the reducer
const { actions, reducer } = channelSlice;
// Extract and export each action creator by name
export const { setChannels, unsetChannels, setError, setLoading } = actions;
// Export the reducer, either as a default or named export
export default reducer;
