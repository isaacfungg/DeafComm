import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
    recents: [
        {
            id: 1,
            name: 'Joe',
            number: '236-123-4567',
            image: ''
        },
        {
            id: 2,
            name: 'Mark',
            number: '604-321-0987',
            image: ''
        },
        {
            id: 3,
            name: 'Jason',
            number: '604-555-5555',
            image: ''
        },
        {
            id: 4,
            name: 'Jack',
            number: '236-987-6543',
            image: ''
        },
    ],
    isLoggedIn: false,
    phoneNumber: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addCall(call) {
        dispatch({
            type: 'ADD_CALL',
            payload: call,
        })
    }

    function setLogIn(logInStatus) {
        dispatch({
            type: 'SET_LOGIN_STATUS',
            payload: logInStatus,
        })
    }

    function setPhoneNumber(phoneNumber) {
        dispatch({
            type: 'SET_PHONE_NUMBER',
            payload: phoneNumber,
        })
    }

    return (
        <GlobalContext.Provider
            value = {{
                recents: state.recents,
                phoneNumber: state.phoneNumber,
                isLoggedIn: state.isLoggedIn,
                addCall,
                setPhoneNumber,
                setLogIn,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}