import React, { useEffect, useReducer, useRef } from 'react';
import Modal from 'react-modal';

import '../../../scss/Clients.scss';
import { getClients } from '../../../api/Clients';
import ClientsTable from "./ClientsTable";
import ClientsHeader from "./ClientsHeader";
import PageHeader from "../../../components/Custom/CustomHeaders/PageHeader";

Modal.setAppElement(document.getElementById('root'));

const types = {
    API_FETHCED: 0,
    HANDLE_CLICKS: 1,
    MANAGE_CLIENTS: 2,
    TOGGLE_FILTER_STATUS: 3,
    TOGGLE_FILTER_MANAGER: 4,
    SET_FILTER_STATUS: 5,
    SET_FILTER_MANAGER: 6,
    FILTER_STATUS_AND_MANAGER: 7
}

const clientsReducer = (state, action) => {
    switch (action.type) {
        case types.API_FETHCED: {
            return {
                ...state,
                fetched: action.clients,
                clients: action.clients,
                loading: action.loading
            }
        }
        case types.HANDLE_CLICKS: {
            return state;
        }
        case types.MANAGE_CLIENTS: {
            return {
                ...state,
                clients: action.clients,
            }
        }
        case types.TOGGLE_FILTER_STATUS: {
            return {
                ...state,
                statusFilter: action.statusFilter
            }
        }
        case types.TOGGLE_FILTER_MANAGER: {
            return {
                ...state,
                managerFilter: action.managerFilter
            }
        }
        case types.SET_FILTER_STATUS: {
            return {
                ...state,
                statusFilterName: action.statusFilterName
            }
        }
        case types.SET_FILTER_MANAGER: {
            return {
                ...state,
                managerFilterName: action.managerFilterName
            }
        }
        case types.FILTER_STATUS_AND_MANAGER: {
            return {
                ...state,
                statusFilter: action.statusFilter,
                managerFilter: action.managerFilter
            }
        }
        default:
            return state;
    }
}

const Clients = () => {
    const initialState = {
        deleteClientModal: false,
        client: {},
        clients: [],
        fetched: [],
        statusFilter: false,
        managerFilter: false,
        statusFilterName: '',
        managerFilterName: '',
        loading: true
    };
    const [state, dispatch] = useReducer(clientsReducer, initialState);
    const statusFilterNode = useRef();
    const managerFilterNode = useRef();

    useEffect(() => {
        const currentSelectMenu = document.getElementsByClassName('menuSelected');
        currentSelectMenu[0].classList.remove('menuSelected');
        document.getElementById('menuClientsId').classList.add('menuSelected');

        // Create an scoped async function in the hook
        async function fetchClients() {
            await loadClients();
            document.addEventListener('mousedown', handleClick, false);
        }
        // Execute the created function directly
        fetchClients();

        return (() => {
            document.removeEventListener('mousedown', handleClick, false);
        });
    }, []);

    // load clients api
    const loadClients = async () => {
        const token = localStorage.getItem('token');
        const body = {
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer $2b$10$JH7Lc2Tw6rl5VhLUiPFxAOj.0z0GyH/3fdUMLsEQjeO7l14Gcmu1y"
        }
        try {
            const data = await getClients(body, headers);
            dispatch({ type: types.API_FETHCED, clients: data, loading: false });
        } catch (error) {
            console.log(error);
        }
    };

    // Handling clicks outside of Filters
    const handleClick = e => {
        // Clicks inside of nodes
        if (statusFilterNode.current.contains(e.target)) {
            return;
        }
        if (managerFilterNode.current.contains(e.target)) {
            return;
        }

        // Clisks outside, toggle both of filters to hidden
        dispatch({
            type: types.FILTER_STATUS_AND_MANAGER,
            statusFilter: false,
            managerFilter: false
        });
    };

    const toggleStatusFilter = () => {
        dispatch({ type: types.TOGGLE_FILTER_STATUS, statusFilter: !state.statusFilter });
    };

    const toggleManagerFilter = () => {
        dispatch({ type: types.TOGGLE_FILTER_MANAGER, managerFilter: !state.managerFilter });
    };

    const setDefaultStatusFilter = () => {
        dispatch({ type: types.MANAGE_CLIENTS, clients: state.fetched });
    };

    const changeFilterActiveStatus = (isActive) => {
        dispatch({
            type: types.MANAGE_CLIENTS,
            clients: state.fetched.filter(client => {
                return isActive ? client.clientStatus : !client.clientStatus;
            })
        });
    };

    const filterManager = name => {
        dispatch({
            type: types.MANAGE_CLIENTS,
            clients: state.fetched.filter(client => {
                return client.accountManager === name;
            })
        });
    };

    const setStatusFilterName = name => {
        dispatch({
            type: types.SET_FILTER_STATUS,
            statusFilterName: name
        });
    };

    const setManagerFilterName = name => {
        dispatch({
            type: types.SET_FILTER_MANAGER,
            managerFilterName: name
        });
    };

    return (
        <div className="pageWrapper">
            {state.loading
                ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <div className="pageLoader" />
                </div>
                : <>
                    <PageHeader text="Clients" />
                    <ClientsHeader
                        toggleManagerFilter={toggleManagerFilter}
                        setDefaultStatusFilter={setDefaultStatusFilter}
                        toggleStatusFilter={toggleStatusFilter}
                        changeFilterActiveStatus={changeFilterActiveStatus}
                        filterManager={filterManager}
                        filterStatusRef={statusFilterNode}
                        filterManagerRef={managerFilterNode}
                        statusFilter={state.statusFilter}
                        managerFilter={state.managerFilter}
                        statusFilterName={state.statusFilterName}
                        managerFilterName={state.managerFilterName}
                        setStatusFilterName={setStatusFilterName}
                        setManagerFilterName={setManagerFilterName}
                        fetched={state.fetched} />
                    <ClientsTable loading={state.loading} clients={state.clients} />
                </>
            }
        </div>
    );
};

export default Clients;
