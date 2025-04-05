import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { getFromLocalStorage, saveToLocalStorage } from './localStorage';
import { ITeachers } from '../common/ITeachers';



interface TeachersState {
    teachersData: ITeachers | null;
}

const initialState: TeachersState = {
    teachersData: getFromLocalStorage('teachersData') || null,
};

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        setTeacher: (state, action: PayloadAction<Draft<ITeachers>>) => {
            state.teachersData = action.payload;
            saveToLocalStorage('teachersData', action.payload);
        },
        clearTeacher: (state) => {
            state.teachersData = null;
            localStorage.removeItem('teachersData');
        },
    },
});

export const { setTeacher, clearTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;
