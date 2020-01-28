import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Clients from '../containers/Client/Clients/Clients';
import Spaces from '../containers/Spaces/Spaces';
import PATH from '../properties/paths';
import AddClient from '../containers/Client/AddClient/AddClient';
import EditClient from '../containers/Client/EditClient/EditClient';
import SeeClient from '../containers/Client/SeeClient/SeeClient';

const AdminHome = () => (
  <>
    <Route exact path={PATH.clients} component={Clients} />
    <Route exact path={PATH.addClient} component={AddClient} />
    <Route exact path={PATH.editClient} component={EditClient} />
    <Route exact path={PATH.seeClient} component={SeeClient} />
    <Route exact path={PATH.spaces} component={Spaces} />

    <Sidebar />
    <Header />
  </>
);

export default AdminHome;
