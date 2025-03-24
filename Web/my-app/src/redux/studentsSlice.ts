import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { getFromLocalStorage, saveToLocalStorage } from './localStorage';
import { IStudents } from '../common/IStudents';



interface StudentsState {
    studentsData: IStudents | null;
}

const initialState: StudentsState = {
    studentsData: getFromLocalStorage('studentsData') || null,
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<Draft<IStudents>>) => {
            state.studentsData = action.payload;
            saveToLocalStorage('studentsData', action.payload);
        },
        clearStudent: (state) => {
            state.studentsData = null;
            localStorage.removeItem('studentsData');
        },
    },
});

export const { setStudent, clearStudent } = studentSlice.actions;
export default studentSlice.reducer;
