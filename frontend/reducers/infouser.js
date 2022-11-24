import { createSlice } from '@reduxjs/toolkit';
const initialState = {
 value: [],
};

export const infoUserSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
   showUsersInfo: (state,action) => {
    //console.log(action.payload);
     state.value.push(action.payload)
   },
   showIds : (stateb,actionb) => {

    stateb.value.push(actionb.payload)

   }


 },
});

export const { showStatusLog } = loggedSlice.actions;
export default loggedSlice.reducer;