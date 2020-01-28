import React from 'react';
import '../../../scss/CustomHeaders.scss';
import { string } from 'prop-types';

const PageHeader = ({ text }) => <h1 className="pageHeaderText">{text}</h1>;

PageHeader.propTypes = {
  text: string.isRequired
};

export default PageHeader;
