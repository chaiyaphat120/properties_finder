import { createSlice } from '@reduxjs/toolkit';
export const configNavogationSlice = createSlice({ 
    name: 'UserData',
    initialState: {
        selectionHome:'property-news',
    },
    reducers: {
        settingSelectionMenuHome: (initialState, action) => {
            return(
                {...initialState,selectionHome:action.payload}
            )
        } ,
    },
});

const { settingSelectionMenuHome } = configNavogationSlice.actions;  

export const settingSelectionMenuHomeAction = (data) =>  {   
    return(dispatch)=>{
        dispatch(settingSelectionMenuHome(data));
    }
};


//get value
export const settingSelectionMenuHomeValue = state => state.configNavogationState; 

