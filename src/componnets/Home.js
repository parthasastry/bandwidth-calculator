import React from 'react';
import AddClientData from './AddClientData';
import ClientList from '../componnets/ClientList'

const Home = () => {
    return (
        <div>
            <AddClientData />
            <hr />
            <ClientList />
        </div>
    )
}

export default Home
