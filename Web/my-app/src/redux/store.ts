import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentsSlice';
import teachersReducer from './teachersSlice';

const store = configureStore({
    reducer: {
        students: studentReducer,
        teachers: teachersReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
