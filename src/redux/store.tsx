import {configureStore} from '@reduxjs/toolkit'

import { authReducer } from './reducers/AuthReducer';
import root from './reducers/root';


const store = configureStore({
    reducer:root
})


export default store;
