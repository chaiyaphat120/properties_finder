import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid'
export const userSlice = createSlice({ 
    name: 'User',
    initialState: [
        {id:uuidv4(),imageUrl:"https://sg2-cdn.pgimgs.com/developer-listing/4370109/OUPHO.122053829.V800/Grene-Condo-Donmueang-Songprapha-Don-Mueang-Thailand.jpg"},
        {id:uuidv4(),imageUrl:"https://img.rea-asia.com/thinkofliving/750x500-fit/wp-content/uploads/1/2018/03/Happy-condo-%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_Web-Cover.jpg"},
        {id:uuidv4(),imageUrl:"https://www.theriver-condo.com/wp-content/uploads/2015/04/The-River-Bangkok-condo-for-rent-1.jpg"},
        {id:uuidv4(),imageUrl:"https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}
    ],
    reducers: {
        fecthDataUser: (initialState, action) => initialState.concat({...action.payload,selectd:action.payload.id}) ,
        deleteDataUser: (initialState, action) =>{
            return(
                initialState.filter(e=>e.id !==action.payload)
            )
        }
    },
});

const { fecthDataUser , deleteDataUser} = userSlice.actions;  

//action
export const fecthDataUserAction = (data) =>  {    
    return(dispatch)=>{
        dispatch(fecthDataUser(data));
    }
};

export const deleteUserAction = (data) =>  {    
    return(dispatch)=>{
        dispatch(deleteDataUser(data));
    }
};

//get value
export const userValue = state => state.userState;  //ดึงค่าจาก store  useselector

