import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Sidebar.scss';
import PATH from '../../properties/paths';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebarMenu">
      <div id="menuAnalyticsId" className="menuAnalytics">
        <p className="menuAnalyticsText">Analytics</p>
      </div>

      <Link to={PATH.clients}>
        <div id="menuClientsId" className="menuSelected menuClients">
          <p className="menuClientsText">Clients</p>
        </div>
      </Link>

      <Link to={PATH.spaces}>
        {' '}
        <div id="menuSpacesId" className="menuSpaces">
          <p className="menuSpacesText">Spaces</p>
        </div>
      </Link>

      <div id="menuBookingsId" className="menuBookings">
        <p className="menuBookingsText">Bookings</p>
      </div>

      <div className="menuMembers">
        <p className="menuMembersText">Members</p>
      </div>

      <div className="menuPerks">
        <p className="menuPerksText">Perks</p>
      </div>
      <div className="menuSubscriptions">
        <p className="menuSubscriptionsText">Subscriptions</p>
      </div>
      <div className="menuFeedback">
        <p className="menuFeedbackText">Feedback</p>
      </div>

      <div className="menuSettings">
        {' '}
        <i className="fa fa-cog settingsIcon" />
        <p className="menuSettingsText">Settings</p>
      </div>
    </div>
  </div>
);

export default Sidebar;
