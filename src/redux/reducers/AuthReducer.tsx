import { LOGIN, GOOGLE_LOGIN } from '../constants'

const user = {};

export const authReducer = (state = user, action: any) => {

    switch (action.type) {
        case LOGIN:
            return [
               
            ]


        case GOOGLE_LOGIN:
            return [

            ]

        default:
            return state;
        

    }

}