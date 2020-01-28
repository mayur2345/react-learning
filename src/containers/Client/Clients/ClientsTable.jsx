import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Link } from 'react-router-dom';

const ClientsTable = props => {
    const onActionButtonClick = e => {
        const id = e.target.name;
        if (id) {
            const actionButtonMenu = document.getElementById(`${id}div`);
            if (actionButtonMenu.classList.contains('displayBlock')) {
                actionButtonMenu.classList.remove('displayBlock');
            } else {
                actionButtonMenu.classList.add('displayBlock');
            }
        }
    };

    return (
        <div>
            {!props.loading
                ? <div className="tableWrapper">
                    <TableContainer className="clientsTableContainer">
                        <Table className="clientsTable" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Client ID</TableCell>
                                    <TableCell>Full name</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell># of spaces</TableCell>
                                    <TableCell>Account manager</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!props.loading && props.clients.map(client => (
                                    <React.Fragment key={client.clientID}>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`/clients/see-client/${client.clientFirstName.replace(
                                                        / /g,
                                                        ''
                                                    )}`}
                                                >
                                                    {client.clientID}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{client.clientFirstName} {client.clientLastName}</TableCell>
                                            {/* <TableCell>{client.company}</TableCell> */}
                                            <TableCell>{client.workClubUserFirstName}</TableCell>
                                            <TableCell>{client.clientEmail}</TableCell>
                                            <TableCell>
                                                {client.clientStatus === 1 ? (
                                                    <button className="statusButton">Active</button>
                                                ) : (
                                                        <button className="statusButton">Not active</button>
                                                    )}
                                            </TableCell>
                                            <TableCell className="paddingLeft3Percentage">
                                                {client.spaceCount}
                                            </TableCell>
                                            <TableCell>
                                                {/* {client.accountManager} */}
                                                {client.workClubUserLastName}
                                                <button
                                                    name={client.clientID}
                                                    id={client.clientID}
                                                    className="fa fa-ellipsis-v actionButton"
                                                    value={client.clientStatus}
                                                    onClick={(e) => onActionButtonClick(e)}
                                                    style={{ paddingLeft: 5, paddingRight: 5 }}>
                                                    <div
                                                        className="dropdown-content actionDropdown"
                                                        id={client.clientID + 'div'}>
                                                        <Link
                                                            className="actionDropdownElement"
                                                            onClick={() => {
                                                                // props.saveClientInStore(client);
                                                            }}
                                                            to={`/clients/edit-client/${client.clientID}`}
                                                        >
                                                            Edit
                                                        </Link>
                                                        {client.clientStatus ?
                                                            (<div
                                                                className="actionDropdownElement"
                                                                onClick={() => {
                                                                    //   props.deactivateClient(client.clientID);
                                                                }}
                                                            >
                                                                Deactivate
                                                            </div>)
                                                            : (<div
                                                                className="actionDropdownElement"
                                                                onClick={() => {
                                                                    // props.activateClient(client.clientID);
                                                                }}>
                                                                Activate
                                                                </div>)
                                                        }
                                                        <div
                                                            className="actionDropdownElement"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                // props.toggleActionButton(e);
                                                                // toggleDeleteClientModal();
                                                                // setCurrentClient(client);
                                                            }}>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                : null
            }
        </div>
    );
};

export default ClientsTable;