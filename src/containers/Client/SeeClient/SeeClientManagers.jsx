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
import {
  SecondaryInput,
  ValidationSecondaryInput,
  SecondarySelect
} from '../../../components/Custom/CustomInputs/PrimaryInput';

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

const ManagersEmptyBox = () => (
  <div className="see-client-spaces-empty-box-wrapper">
    <div className="box">
      <div className="plusIcon">
        <p>+</p>
      </div>
      <div className="texts">
        <h1>Add new manager</h1>
      </div>
      <PrimaryButton text="Add space" onClick={() => { }} />
    </div>
  </div>
);

const SeeClientManagers = props => {
  return (
    <div>
      {props.managers.length < 1
        ? (<ManagersEmptyBox />)
        :
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
                text='Add Manager'
                onClick={props.toggleAddManager} />
            </div>
          </div>

          <div className="tableWrapper" style={{ padding: 0, position: 'relative' }}>
            <TableContainer className="clientsTableContainer">
              <Table className="clientsTable" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <>
                      <TableCell className="tableHeadTitle">
                        Full name
                      </TableCell>
                      <TableCell className="tableHeadTitle">
                        Email
                      </TableCell>
                      <TableCell className="tableHeadTitle">Role</TableCell>
                      <TableCell className="tableHeadTitle">
                        Access
                      </TableCell>
                      <TableCell className="tableHeadTitle">
                        Status
                      </TableCell>
                    </>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {props.managers.map(manager => (
                      <TableRow key={manager.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="tableBoldBodyValue">
                          <Link to={`/clients/see-manager/${manager.id}`}>
                            {manager.fullName}
                          </Link>
                        </TableCell>
                        <TableCell className="tableBoldBodyValue">
                          {manager.email}
                        </TableCell>
                        <TableCell className="tableGreyBodyValue">
                          {manager.role}
                        </TableCell>
                        <TableCell className="tableGreyBodyValue">
                          {manager.access}
                        </TableCell>
                        <TableCell>
                          {manager.status === 'Active' ? (
                            <button
                              type="button"
                              className="see-client-statusButton">
                              Active
                                </button>
                          ) : manager.status === 'Pending' ? (
                            <button
                              type="button"
                              className="see-client-statusButton">
                              Pending
                            </button>
                          ) : (
                                <button
                                  className="see-client-statusButton"
                                  type="button">
                                  Inactive
                                </button>
                              )}
                          <button
                            type="button"
                            name={manager.id}
                            id={manager.id}
                            className="fa fa-ellipsis-v actionButton"
                            value={manager.status}
                            style={{ padding: 10 }}
                            onClick={props.onActionButtonClick}>
                            <div
                              className="dropdown-content actionDropdown"
                              id={manager.id + 'div'}>
                              <button
                                type="button"
                                onClick={e => {
                                  props.disableActionButton(manager.id);
                                  props.toggleEditManager();
                                }}
                                className="actionDropdownElement">
                                Edit
                              </button>
                              {manager.status === 'Active' ? (
                                <>
                                  <button
                                    type="button"
                                    className="actionDropdownElement"
                                    onClick={() => {
                                      props.disableActionButton(manager.id);
                                    }}>
                                    Reset password
                                      </button>
                                  <button
                                    type="button"
                                    className="actionDropdownElement"
                                    onClick={e => {
                                      props.deactivateManager(manager.id);
                                      props.disableActionButton(manager.id);
                                    }}>
                                    Deactivate
                                  </button>
                                </>
                              ) : manager.status === 'Pending' ? (
                                <>
                                  <button
                                    type="button"
                                    className="actionDropdownElement"
                                    onClick={() => {
                                      props.disableActionButton(manager.id);
                                    }}>
                                    Resend invitation
                                      </button>
                                </>
                              ) : (
                                    <>
                                      <div
                                        className="actionDropdownElement"
                                        onClick={() => {
                                          props.disableActionButton(manager.id);
                                        }}>
                                        Reset password
                                      </div>
                                      <div
                                        className="actionDropdownElement"
                                        onClick={() => {
                                          props.disableActionButton(manager.id);
                                          props.activateManager(manager.id);
                                        }}>
                                        Activate
                                      </div>
                                    </>
                                  )}
                              <div
                                className="actionDropdownElement"
                                onClick={() => {
                                  props.disableActionButton(manager.id);
                                }}>
                                Delete
                              </div>
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
      }

      {props.addManager ? (
        <Modal isOpen={props.addManager} style={modalStyles} closeTimeoutMS={150}>
          <div className="managerHeader">
            <div className="delete-client-header-title">
              <h3>Add manager </h3>
              <p>Client: Erlan Belekov</p>
            </div>
          </div>
          <div
            className="delete-client-middle"
            style={{
              background: '#FFF',
              paddingBottom: '100px',
              border: '0'
            }}>
            <div className="manager-modal-top-inputs">
              <SecondaryInput
                spanText="First Name *"
                value="Erlan"
                onChange={props.handleAddManager} />
              <SecondaryInput
                spanText="First Name *"
                value="Erlan"
                onChange={props.handleAddManager} />
            </div>
            <div className="manager-modal-column-inputs">
              <ValidationSecondaryInput
                spanText="Email *"
                value="belekoverlanhehe@gmail.com"
                icon={<i className="fa fa-check" />} />
              <SecondarySelect
                spanText="Role *"
                value="Software Engineer"
                options={[
                  {
                    id: 1,
                    value: 'Space manager'
                  },
                  {
                    id: 2,
                    value: 'Security member'
                  }
                ]} />
              <SecondarySelect
                spanText="Role *"
                value="Software Engineer"
                options={[
                  {
                    id: 1,
                    value: 'Space manager'
                  },
                  {
                    id: 2,
                    value: 'Security member'
                  }
                ]} />
            </div>
          </div>
          <div className="managerButtons">
            <div className="cancel">
              <button
                type="button"
                className="cancelText"
                onClick={props.toggleAddManager}>
                Cancel
              </button>
            </div>
            <button
              type="button"
              className="save"
              onClick={() => {
                props.toggleAddManager();
              }}>
              Save
            </button>
          </div>
        </Modal>
      ) : null}

      {props.editManager ? (
        <Modal isOpen={props.editManager} style={modalStyles} closeTimeoutMS={150}>
          <div className="managerHeader">
            <div className="delete-client-header-title">
              <h3>Edit manager </h3>
              <p>Client: Erlan Belekov</p>
            </div>
          </div>
          <div
            className="delete-client-middle"
            style={{
              background: '#FFF',
              paddingBottom: '100px',
              border: '0'
            }}>
            <div className="manager-modal-top-inputs">
              <SecondaryInput
                spanText="First Name *"
                name="lastName"
                value="Erlan" />
              <SecondaryInput
                spanText="First Name *"
                name="firstName"
                value="Erlan" />
            </div>
            <div className="manager-modal-column-inputs">
              <ValidationSecondaryInput
                locked
                spanText="Email *"
                value="belekoverlanhehe@gmail.com"
                icon={<i className="fa fa-check" />} />
              <SecondarySelect
                locked
                spanText="Role *"
                value="Software Engineer"
                options={[
                  {
                    id: 1,
                    value: 'Space manager'
                  },
                  {
                    id: 2,
                    value: 'Security member'
                  }
                ]} />
              <SecondarySelect
                locked
                spanText="Role *"
                value="Software Engineer"
                options={[
                  {
                    id: 1,
                    value: 'Space manager'
                  },
                  {
                    id: 2,
                    value: 'Security member'
                  }
                ]} />
            </div>
          </div>
          <div className="managerButtons">
            <div className="cancel">
              <button
                type="button"
                className="cancelText"
                onClick={() => {
                  props.toggleEditManager();
                }}>
                Cancel
              </button>
            </div>
            <button
              type="button"
              className="save"
              onClick={() => {
                props.toggleEditManager();
              }}>
              Save
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default SeeClientManagers;