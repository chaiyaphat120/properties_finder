import { configureStore } from '@reduxjs/toolkit';

import {userSlice} from '../slice/usersSlice'
import {userDataSlice} from '../slice/dataUser'
import {configNavogationSlice} from '../slice/configNavogationSlice'
export default configureStore({
  reducer: {
    userState:userSlice.reducer,
    userDataState:userDataSlice.reducer,
    configNavogationState:configNavogationSlice.reducer

  },
});
