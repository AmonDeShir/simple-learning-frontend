import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from './slices/users/user';
import { gameReducer } from './slices/game/game';
import { editSetReducer } from './slices/edit-set/edit-set';
import { learnReducer } from './slices/learn/learn';

export const store = configureStore({
  reducer: {
      user: userReducer,
      editSet: editSetReducer,
      game: gameReducer,
      learn: learnReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
