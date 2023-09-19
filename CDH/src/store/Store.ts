import { configureStore } from '@reduxjs/toolkit';
import CollectionReducer from './slices/CollectionSlice';
import ObjectReducer from './slices/ObjectSlice';

const store = configureStore({
    reducer: {
        collections: CollectionReducer,
        objects: ObjectReducer,
    },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;