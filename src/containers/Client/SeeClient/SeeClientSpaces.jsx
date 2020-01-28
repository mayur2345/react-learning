import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import '../../../scss/SeeClient.scss';
import PrimaryButton from '../../../components/Custom/CustomButtons/PrimaryButton';
import PATH from '../../../properties/paths';
Modal.setAppElement(document.getElementById('root'));

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        backgroundColor: '#FAFAFA',
        padding: 0,
        borderRadius: '8px',
        boxShadow: '0px 2px 21px rgba(182, 182, 182, 0.2)'
    }
};

const SpacesEmptyBox = () => (
    <div className="see-client-spaces-empty-box-wrapper">
        <div className="box">
            <div className="plusIcon">
                <p>+</p>
            </div>
            <div className="texts">
                <h1>Add new space</h1>
                <p>Set up new venues for this client</p>
            </div>
            <PrimaryButton text="Add space" onClick={() => { }} />
        </div>
    </div>
);

const SeeClientSpaces = props => {
    return (
        <div>
            {props.deleteSpaceModal ? (
                <Modal
                    isOpen={props.deleteSpaceModal}
                    style={modalStyles}
                    closeTimeoutMS={150}>
                    <div className="delete-client-header">
                        <div className="delete-client-header-title">
                            <h3>Delete client</h3>
                            <p>{props.fullName}</p>
                        </div>
                        <button
                            type="button"
                            className="modal-close-icon"
                            onClick={props.toggleDeleteSpace}>
                            X
                </button>
                    </div>
                    <div className="delete-client-middle">
                        <div className="delete-client-middle-top">
                            <p>Do you really want to delete space?</p>
                        </div>
                        <div className="delete-client-middle-space" />
                        <div className="delete-client-middle-loss-info">
                            <div className="delete-client-text-wrapper">
                                <p className="delete-client-underline">1 space &nbsp;</p>
                                <p>will be deleted</p>
                            </div>
                            <div className="delete-client-text-wrapper">
                                <p className="delete-client-underline">
                                    10 upcoming bookings &nbsp;
                                </p>
                                <p>will be deleted</p>
                            </div>
                        </div>
                    </div>
                    <div className="delete-client-buttons">
                        <div className="delete-client-cancel-button">
                            <button
                                type="button"
                                className="delete-client-cancel-text"
                                onClick={props.toggleDeleteSpace}>
                                Cancel
                            </button>
                        </div>
                        <div className="addClientBtnWrapper">
                            <button
                                type="button"
                                className="addClientBtn"
                                onClick={props.toggleDeleteSpace}>
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            ) : null}

            {props.spaces.length < 1 ? (
                <SpacesEmptyBox />
            ) : (
                    <>
                        <div className="see-client-actions">
                            <div className="actions-center searchInputWrapper">
                                <input
                                    className="searchInput"
                                    type="text"
                                    placeholder="Search..."
                                    name="search"
                                    onChange={props.handleSearch}
                                />
                            </div>
                            <div
                                className="actions-center buttonWrapper"
                                style={{ justifyContent: 'flex-end' }}>
                                <PrimaryButton
                                    text='Add Space'
                                    onClick={() => {
                                        window.location.href = `http://localhost:3000${PATH.addClient}`;
                                    }}
                                />
                            </div>
                        </div>
                        <div className="tableWrapper" style={{ padding: 0, position: 'relative' }}>
                            <TableContainer className="clientsTableContainer">
                                <Table className="clientsTable" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <>
                                                <TableCell className="tableHeadTitle">
                                                    Space ID
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    Space name
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    Address
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    Space manager
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    # of spots
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    Rating
                                                </TableCell>
                                                <TableCell className="tableHeadTitle">
                                                    Status
                                                </TableCell>
                                            </>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <>
                                            {props.spaces.map(space => (
                                                <TableRow key={space.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        className="tableBoldBodyValue">
                                                        <Link to={`/clients/see-client/${space.id}`}>
                                                            {space.id}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="tableBoldBodyValue">
                                                        Hey there
                                                    </TableCell>
                                                    <TableCell className="tableGreyBodyValue">
                                                        Point A Hotel London - Kings Cross St <br />
                                                        Pancras, Grays Inn Road, London, UK
                                                    </TableCell>
                                                    <TableCell className="tableGreyBodyValue">
                                                        Erlan Belekov
                                                    </TableCell>
                                                    <TableCell className="tableGreyBodyValue">
                                                        10
                                                    </TableCell>
                                                    <TableCell className="tableGreyBodyValue">
                                                        4.8
                                                    </TableCell>
                                                    <TableCell>
                                                        {space.status ? (
                                                            <button
                                                                type="button"
                                                                className="see-client-statusButton">
                                                                Published
                                                            </button>
                                                        ) : (
                                                                <button
                                                                    type="button"
                                                                    className="see-client-statusButton">
                                                                    Unpublished
                                                            </button>
                                                            )}
                                                        <button
                                                            type="button"
                                                            name={space.id}
                                                            id={space.id}
                                                            className="fa fa-ellipsis-v actionButton"
                                                            value={space.status}
                                                            onClick={props.onActionButtonClick}>
                                                            <div
                                                                className="dropdown-content actionDropdown"
                                                                id={`${space.id}div`}>
                                                                <Link
                                                                    className="actionDropdownElement"
                                                                    to="/">
                                                                    Edit
                                                                </Link>
                                                                {space.status ? (
                                                                    <>
                                                                        <button
                                                                            type="button"
                                                                            className="actionDropdownElement"
                                                                            onClick={() => {
                                                                                props.unpublishSpace(space.id);
                                                                                props.disableActionButton(space.id);
                                                                            }}>
                                                                            Unpublish
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="actionDropdownElement"
                                                                            onClick={() => {
                                                                                props.disableActionButton(space.id);
                                                                            }}>
                                                                            Preview
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                        <button
                                                                            type="button"
                                                                            className="actionDropdownElement"
                                                                            onClick={() => {
                                                                                props.publishSpace(space.id);
                                                                                props.disableActionButton(space.id);
                                                                            }}>
                                                                            Publish
                                                                        </button>
                                                                    )}
                                                                <button
                                                                    type="button"
                                                                    className="actionDropdownElement"
                                                                    onClick={() => {
                                                                        props.disableActionButton(space.id);
                                                                        props.toggleDeleteSpace();
                                                                    }}>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default SeeClientSpaces;