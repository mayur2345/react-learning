import React, { useEffect, useReducer } from "react";

import '../../../scss/SeeClient.scss';
import SeeClientHeader from './SeeClientHeader';
import SeeClientBody from "./SeeClientBody";
import SeeClientSpaces from "./SeeClientSpaces";
import SeeClientManagers from "./SeeClientManagers";

const spaces = [
    {
        id: '000000',
        name: 'Hello World',
        address:
            'Point A Hotel London - Kings Cross St <br/>Pancras, Grays Inn Road, London, UK',
        manager: 'Erlan Belekov',
        numOfSpots: 10,
        rating: 4.5,
        status: true
    },
    {
        id: '000001',
        name: 'Hello World',
        address:
            'Point A Hotel London - Kings Cross St <br/>Pancras, Grays Inn Road, London, UK',
        manager: 'Erlan Belekov',
        numOfSpots: 10,
        rating: 4.5,
        status: true
    },
    {
        id: '000002',
        name: 'Hello World',
        address:
            'Point A Hotel London - Kings Cross St <br/>Pancras, Grays Inn Road, London, UK',
        manager: 'Erlan Belekov',
        numOfSpots: 10,
        rating: 4.5,
        status: true
    },
    {
        id: '000003',
        name: 'Hello World',
        address:
            'Point A Hotel London - Kings Cross St <br/>Pancras, Grays Inn Road, London, UK',
        manager: 'Erlan Belekov',
        numOfSpots: 10,
        rating: 4.5,
        status: true
    },
    {
        id: '000004',
        name: 'Hello World',
        address:
            'Point A Hotel London - Kings Cross St <br/>Pancras, Grays Inn Road, London, UK',
        manager: 'Erlan Belekov',
        numOfSpots: 10,
        rating: 4.5,
        status: true
    }
];

const managers = [
    {
        id: '000000',
        email: 'isken75@gmail.com',
        fullName: 'Isken Afidzhanov',
        role: 'Project Manager',
        access: 'Full Access',
        status: 'Active'
    },
    {
        id: '000001',
        email: 'belekoverlanhehe@mail.ru',
        fullName: 'Erlan Belekov',
        role: 'Software Developer',
        access: 'Vinoteca city',
        status: 'Pending'
    },
    {
        id: '000002',
        email: 'yurisashkov@gmail.com',
        fullName: 'Yuri Sashkov',
        role: 'Software Developer',
        access: 'Tibits Bankside',
        status: 'Inactive'
    },
    {
        id: '000003',
        email: 'animegirl@yahoomail.com',
        fullName: 'Mary Loore',
        role: 'Researcher',
        access: 'Leeds city',
        status: 'Active'
    },
    {
        id: '000004',
        email: 'ilovestarbucks@gmail.com',
        fullName: 'Starbucks lover',
        role: 'Project Manager',
        access: 'London city',
        status: 'Active'
    }
];

const Tab = ({ active, text, onClick, firstTab }) => (
    <button
        type="button"
        className={`${active ? 'tab tab-active' : 'tab'}`}
        onClick={onClick}
        style={firstTab ? { margin: 0 } : {}}>
        <p className={`${active ? 'tab-text tab-text-active' : 'tab-text'}`}>
            {text}
        </p>
    </button>
);

const types = {
    API_FETHCED: 0,
    TOGGLE_TAB: 1,
    TOGGLE_ADD_MANAGER: 2,
    TOGGLE_EDIT_MANAGER: 3,
    UPDATE_SPACES_STATUS: 4,
    UPDATE_MANAGERS_STATUS: 5,
    DELETE_SPACE_MODAL: 6
}

const seeClientsReducer = (state, action) => {
    switch (action.type) {
        case types.API_FETHCED: {
            return {
                ...state,
                spaces: action.spaces,
                managers: action.managers,
                loading: action.loading
            }
        }
        case types.TOGGLE_TAB: {
            return {
                ...state,
                showSpaces: action.showSpaces
            }
        }
        case types.TOGGLE_ADD_MANAGER: {
            return {
                ...state,
                addManager: action.addManager
            }
        }
        case types.TOGGLE_EDIT_MANAGER: {
            return {
                ...state,
                editManager: action.editManager
            }
        }
        case types.UPDATE_MANAGERS_STATUS: {
            return {
                ...state,
                managers: action.managers
            }
        }
        case types.UPDATE_SPACES_STATUS: {
            return {
                ...state,
                spaces: action.spaces
            }
        }
        case types.DELETE_SPACE_MODAL: {
            return {
                ...state,
                deleteSpaceModal: action.deleteSpaceModal
            }
        }
        default:
            return state;
    }
}

const SeeClient = props => {
    const initialState = {
        client: {},
        showSpaces: true,
        addManager: false,
        editManager: false,
        spaces: [],
        managers: [],
        deleteSpaceModal: false,
        loading: true
    }
    const [state, dispatch] = useReducer(seeClientsReducer, initialState);

    useEffect(() => {
        loadFakeData();
        sortManagers();
    }, []);

    const sortManagers = () => {
        state.managers.sort((a, b) => {
            if (a.fullName < b.fullName) {
                return -1;
            }
            if (a.fullName > b.fullName) {
                return 1;
            }
            return 0;
        });
    };

    const loadFakeData = () => {
        dispatch({ type: types.API_FETHCED, spaces: spaces, managers: managers, loading: false });
    };

    const onActionButtonClick = e => {
        const id = e.target.name;
        const actionButtonMenu = document.getElementById(`${id}div`);
        if (actionButtonMenu) {
            if (actionButtonMenu.classList.contains('displayBlock')) {
                actionButtonMenu.classList.remove('displayBlock');
            } else {
                actionButtonMenu.classList.add('displayBlock');
            }
        }
    };

    const toggleShowSpaces = () => {
        dispatch({ type: types.TOGGLE_TAB, showSpaces: !state.showSpaces });
    };

    const handleSearch = () => { };

    const handleAddManager = () => { };

    // Add Manager
    const toggleAddManager = () => {
        dispatch({ type: types.TOGGLE_ADD_MANAGER, addManager: !state.addManager });
    };

    const handleEditManager = () => { };

    // Edit Manager
    const toggleEditManager = () => {
        dispatch({ type: types.TOGGLE_EDIT_MANAGER, editManager: !state.editManager });
    };

    const disableActionButton = id => {
        const actionButton = document.getElementById(`${id}div`);
        if (actionButton.classList.contains('displayBlock')) {
            actionButton.classList.remove('displayBlock');
        } else {
            actionButton.classList.add('displayBlock');
        }
    };

    const deactivateManager = managerID => {
        const { managers } = state;
        const tempManagers = managers;
        tempManagers.forEach(element => {
            if (element.id === managerID) {
                element.status = 'Inactive';
            }
        });
        dispatch({ type: types.UPDATE_MANAGERS_STATUS, managers: tempManagers });
    };

    const activateManager = managerID => {
        const { managers } = state;
        const tempManagers = managers;
        tempManagers.forEach(element => {
            if (element.id === managerID) {
                element.status = 'Active';
            }
        });
        dispatch({ type: types.UPDATE_MANAGERS_STATUS, managers: tempManagers });
    };

    // Spaces
    const unpublishSpace = spaceID => {
        const { spaces } = state;
        const tempSpaces = spaces;
        tempSpaces.forEach(element => {
            if (element.id === spaceID) {
                element.status = false;
            }
        });
        dispatch({ type: types.UPDATE_SPACES_STATUS, managers: tempSpaces });
    };

    const publishSpace = spaceID => {
        const { spaces } = state;
        const tempSpaces = spaces;
        tempSpaces.forEach(element => {
            if (element.id === spaceID) {
                element.status = true;
            }
        });
        dispatch({ type: types.UPDATE_SPACES_STATUS, managers: tempSpaces });
    };

    const toggleDeleteSpace = () => {
        dispatch({ type: types.DELETE_SPACE_MODAL, deleteSpaceModal: !state.deleteSpaceModal });
    };

    return (
        <div className="pageWrapper" style={{ overflow: 'auto' }}>
            <SeeClientHeader />
            <div className="see-client-scroller">
                <SeeClientBody />
                <div className="see-client-tab-switch">
                    <Tab
                        active={state.showSpaces}
                        text="Spaces"
                        onClick={() => {
                            toggleShowSpaces();
                        }}
                        firstTab />
                    <Tab
                        active={!state.showSpaces}
                        text="Managers"
                        onClick={() => {
                            toggleShowSpaces();
                        }} />
                </div>
                <div
                    className="horizontalLine"
                    style={{ margin: '0 28px', padding: 0 }} />
                {state.showSpaces
                    ? <SeeClientSpaces
                        spaces={state.spaces}
                        deleteSpaceModal={state.deleteSpaceModal}
                        fullName={state.client.fullName}
                        toggleDeleteSpace={toggleDeleteSpace}
                        handleSearch={handleSearch}
                        onActionButtonClick={onActionButtonClick}
                        publishSpace={publishSpace}
                        unpublishSpace={unpublishSpace}
                        disableActionButton={disableActionButton} />
                    : <SeeClientManagers
                        managers={state.managers}
                        handleSearch={handleSearch}
                        toggleAddManager={toggleAddManager}
                        toggleEditManager={toggleEditManager}
                        onActionButtonClick={onActionButtonClick}
                        disableActionButton={disableActionButton}
                        activateManager={activateManager}
                        deactivateManager={deactivateManager}
                        handleAddManager={handleAddManager}
                        addManager={state.addManager}
                        editManager={state.editManager} />}
            </div>
        </div>
    );
}

export default SeeClient;