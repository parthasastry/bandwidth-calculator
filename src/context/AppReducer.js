export default function appReducer(state, action) {
    switch(action.type) {
        case "ADD_CLIENT":
            return {
                ...state,
                clientsData: [...state.clientsData, action.payload]
            };

        case "EDIT_CLIENT":
            const updatedClient = action.payload;

            const updatedClientsData = state.clientsData.map((client) => {
                if(client.client === updatedClient.client) {
                    return updatedClient
                }
                return client
            })

            return {
                ...state,
                clientsData: updatedClientsData
            }

        case "DELETE_CLIENT":
            return {
                ...state,
                clientsData: state.clientsData.filter(
                    (client) => client.client !== action.payload
                )
            }

        case "DELETE_ALL_CLIENTS":
            return {
                ...state,
                clientsData: action.payload
            }

        default:
            return state;
    }
}