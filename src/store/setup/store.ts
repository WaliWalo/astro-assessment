import { configureStore } from '@reduxjs/toolkit';
import {
  RootStateOrAny,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import channelReducer from '../channel/channelSlice';
import favReducer from '../fav/favSlice';

const store = configureStore({
  reducer: {
    channels: channelReducer,
    fav: favReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootStateOrAny> = useSelector;

export default store;
