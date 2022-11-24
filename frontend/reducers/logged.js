import { createSlice } from '@reduxjs/toolkit';
const initialState = {
 value: [],
};

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
   showStatusLog: (state,action) => {
    //console.log(action.payload);
     state.value.push(action.payload)
   },
   showIds : (stateb,actionb) => {

    stateb.value.push(actionb.payload)

   },
   eraseId : (stateb,actiob)=>{

    stateb.value = []

   }

 },
});

export const { showStatusLog , showIds ,eraseId} = loggedSlice.actions;
export default loggedSlice.reducer;