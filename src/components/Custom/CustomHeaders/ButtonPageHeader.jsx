import React from 'react';
import { Link } from 'react-router-dom';
import '../../../scss/CustomHeaders.scss';
import { string, bool, element } from 'prop-types';

const ButtonPageHeader = ({ text, backPath, fullWidth, otherContent }) => (
  <Link to={backPath}>
    {otherContent || (
      <div className="flexContainer">
        <i className="fa fa-arrow-circle-left arrowBack" />
        <h1
          className="pageHeaderTextWithArrow"
          style={fullWidth ? { width: '100%' } : { width: 'auto' }}
        >
          {text}
        </h1>
      </div>
    )}
  </Link>
);

ButtonPageHeader.propTypes = {
  text: string.isRequired,
  backPath: string.isRequired,
  fullWidth: bool.isRequired,
  otherContent: element.isRequired
};

export default ButtonPageHeader;
