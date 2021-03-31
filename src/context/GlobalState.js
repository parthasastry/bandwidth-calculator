import React, { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

const initialState = {
    clientsData: [
        {
            client: 'A',
            sizeInMB: 717668,
            startDate: '2021-03-10',
            endDate: '2021-03-12'
        },
        {
            client: 'B',
            sizeInMB: 362760,
            startDate: '2021-03-10',
            endDate: '2021-03-18'
        },
        {
            client: 'C',
            sizeInMB: 227758,
            startDate: '2021-03-22',
            endDate: '2021-03-22'
        },
        {
            client: 'D',
            sizeInMB: 206580,
            startDate: '2021-03-26',
            endDate: '2021-03-27'
        },
        {
            client: 'E',
            sizeInMB: 1265668,
            startDate: '2021-03-28',
            endDate: '2021-03-29'
        },
        {
            client: 'F',
            sizeInMB: 762644,
            startDate: '2021-03-30',
            endDate: '2021-03-31'
        },
        {
            client: 'G',
            sizeInMB: 637072,
            startDate: '2021-03-28',
            endDate: '2021-03-29'
        },
        {
            client: 'H',
            sizeInMB: 216440,
            startDate: '2021-03-31',
            endDate: '2021-03-31'
        },
        {
            client: 'I',
            sizeInMB: 2261493,
            startDate: '2021-03-23',
            endDate: '2021-03-26'
        },
        {
            client: 'J',
            sizeInMB: 8662699,
            startDate: '2021-03-17',
            endDate: '2021-03-29'
        },
        {
            client: 'K',
            sizeInMB: 6088489,
            startDate: '2021-03-23',
            endDate: '2021-03-29'
        },
        {
            client: 'L',
            sizeInMB: 1074630,
            startDate: '2021-03-16',
            endDate: '2021-03-31'
        },
        {
            client: 'M',
            sizeInMB: 1098070,
            startDate: '2021-03-28',
            endDate: '2021-03-31'
        },
        {
            client: 'N',
            sizeInMB: 4682886,
            startDate: '2021-03-30',
            endDate: '2021-03-31'
        },
        {
            client: 'O',
            sizeInMB: 235724,
            startDate: '2021-03-30',
            endDate: '2021-03-31'
        },
        {
            client: 'P',
            sizeInMB: 2372,
            startDate: '2021-03-05',
            endDate: '2021-03-31'
        },
        {
            client: 'Q',
            sizeInMB: 150030,
            startDate: '2021-03-05',
            endDate: '2021-03-31'
        }
    ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    function addClient(client) {
        dispatch({
            type: "ADD_CLIENT",
            payload: client
        })
    }

    function editClient(client) {
        dispatch({
            type: "EDIT_CLIENT",
            payload: client
        })
    }

    function deleteClient(client) {
        dispatch({
            type: "DELETE_CLIENT",
            payload: client
        })
    }

    function deleteAllClients() {
        dispatch({
            type: "DELETE_ALL_CLIENTS",
            payload: []
        })
    }

    return (
        <GlobalContext.Provider value={{
            clientsData: state.clientsData,
            addClient,
            editClient,
            deleteClient,
            deleteAllClients
        }}
        >
            {children}    
        </GlobalContext.Provider>
    )
}