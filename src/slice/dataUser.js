import { createSlice } from '@reduxjs/toolkit'
export const userDataSlice = createSlice({
    name: 'UserData',
    initialState: {
        _id: '',
        username: '',
        fullname: '',
        email: '',
        tel: '',
        picture: '',
        role:''
    },
    reducers: {
        fecthDataUser: (initialState, action) => {
            const { _id, username, fullname, email, tel, picture ,role} = action.payload.userData
            return { ...initialState, _id: _id, username: username, fullname: fullname, email: email, tel: tel, picture: picture ,role:role}
        },
    },
})

const { fecthDataUser } = userDataSlice.actions

export const fecthDataUserAction = (data) => {
    return (dispatch) => {
        dispatch(fecthDataUser(data))
    }
}


//get value
export const userData = (state) => state.userDataState
