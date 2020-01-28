/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../../scss/Spaces.scss';
import PATH from '../../properties/paths';
import PageHeader from '../../components/Custom/CustomHeaders/PageHeader';

const Spaces = props => {
  const [spacesData, setSpacesData] = useState([]);

  useEffect(() => {
    // Update selected Sidebar menu
    const currentSelectMenu = document.getElementsByClassName('menuSelected');
    currentSelectMenu[0].classList?.remove('menuSelected');
    document.getElementById('menuSpacesId')?.classList.add('menuSelected');

    const spacesFromAPI = loadSpacesFromAPI();
    const sortedSpaces = sortSpaces(spacesFromAPI);
    setSpacesData(sortedSpaces);
  }, []);

  const sortSpaces = spaces => {
    return spaces.sort((a, b) => a.name.localeCompare(b.name));
  };

  const deleteSpace = id => {
    const remSpaces = spacesData.filter(space => {
      return space.id !== id;
    })
    setSpacesData(remSpaces);
  };

  const publish = index => {
    const spaces = [...spacesData];
    spaces[index].published = true;
    setSpacesData(spaces);
  };

  const unpublish = index => {
    const spaces = [...spacesData];
    spaces[index].published = false;
    setSpacesData(spaces);
  };

  const onActionButtonClick = e => {
    const id = e.target.name;
    const actionButtonMenu = document.getElementById(`${id}div`);
    if (actionButtonMenu?.classList.contains('displayBlock')) {
      actionButtonMenu.classList.remove('displayBlock');
    } else {
      actionButtonMenu?.classList.add('displayBlock');
    }
  };

  const loadSpacesFromAPI = () => {
    let spaces = [];
    spaces.push(
      createData({
        id: '#12345',
        name: 'Hello World',
        address: 'Smiths of Smithfield, London, UK',
        client: 'The Gradient',
        spots: 10,
        rating: 4,
        published: true
      })
    );
    spaces.push(
      createData({
        id: '#12346',
        name: 'Nice space',
        address: 'Smiths of Smithfield, London, UK',
        client: 'The Gradient',
        spots: 10,
        rating: 4,
        published: true
      })
    );
    spaces.push(
      createData({
        id: '#12347',
        name: 'Good Space',
        address: 'Smiths of Smithfield, London, UK',
        client: 'The Gradient',
        spots: 10,
        rating: 4,
        published: true
      })
    );
    spaces.push(
      createData({
        id: '#12348',
        name: 'Amazing space',
        address: 'Smiths of Smithfield, London, UK',
        client: 'The Gradient',
        spots: 10,
        rating: 4,
        published: true
      })
    );
    spaces.push(
      createData({
        id: '#12349',
        name: 'fake Space',
        address: 'Smiths of Smithfield, London, UK',
        client: 'The Gradient',
        spots: 10,
        rating: 4,
        published: true
      })
    );
    return spaces;
  };

  const createData = space => {
    const newSpace = {
      id: space.id,
      name: space.name,
      address: space.address,
      client: space.client,
      spots: space.spots,
      rating: space.rating,
      published: space.published
    };
    return newSpace;
  };

  const preview = () => {

  }

  return (
    <div className="pageWrapper">
      <PageHeader text="Spaces" />

      <div className="row">
        <div className="col-4">
          <div className="searchInputWrapper">
            <input
              className="searchInput"
              type="text"
              placeholder="Search by..."
            />
            <i className="fa fa-search inputIcon" />
          </div>
        </div>
        <div className="col-8 paddingRight12PX">
          <div className="addClientBtnWrapper">
            <Link to={PATH.addClient}>
              <button type="button" className="addClientBtn">
                Add Space
                </button>
            </Link>
          </div>
          <div className="statusWrapper">
            <div className="status">
              <span className="statusSpan1">Status</span>
              <span className="statusSpan2">All Statuses</span>
              <div className="fa fa-caret-down statusArrow" />
            </div>
          </div>
        </div>
      </div>

      <div className="tableWrapper">
        <TableContainer className="clientsTableContainer">
          <Table className="clientsTable" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Space ID</TableCell>
                <TableCell>Space name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Client</TableCell>
                <TableCell># of spots</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spacesData.map((space, index) => (
                <TableRow key={space.id}>
                  <TableCell component="th" scope="row">
                    {space.id}
                  </TableCell>
                  <TableCell>{space.name}</TableCell>
                  <TableCell>{space.address}</TableCell>
                  <TableCell>{space.client}</TableCell>
                  <TableCell>{space.spots}</TableCell>
                  <TableCell>{space.rating}</TableCell>
                  <TableCell>
                    {space.published ? (
                      <button type="button" className="statusButton">
                        Published
                        </button>
                    ) : (
                        <button type="button" className="statusButton">
                          Unpublished
                        </button>
                      )}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      name={space.id}
                      id={space.id}
                      className="fa fa-ellipsis-v actionButton"
                      value={space.status}
                      onClick={onActionButtonClick}
                    >
                      <div
                        className="dropdown-content actionDropdown"
                        id={`${space.id}div`}
                      >
                        <Link className="actionDropdownElement" to="/">
                          Edit
                          </Link>
                        {space.published ? (
                          <button
                            type="button"
                            className="actionDropdownElement"
                            onClick={() => {
                              unpublish(index);
                            }}
                          >
                            Unpublish
                            </button>
                        ) : (
                            <button
                              type="button"
                              onClick={() => {
                                publish(index);
                              }}
                              className="actionDropdownElement"
                            >
                              Publish
                            </button>
                          )}
                        {space.published ? (
                          <button
                            type="button"
                            className="actionDropdownElement"
                            onClick={preview}
                          >
                            Preview
                            </button>
                        ) : null}
                        <button
                          type="button"
                          className="actionDropdownElement"
                          onClick={() => {
                            deleteSpace(space.id);
                          }}
                        >
                          Delete
                          </button>
                      </div>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Spaces;
