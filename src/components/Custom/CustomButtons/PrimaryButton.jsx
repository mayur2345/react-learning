import React from 'react';
import PropTypes from 'prop-types';
import '../../../scss/CustomButtons.scss';

const PrimaryButton = ({ name, onClick, text }) => (
  <button type="button" className="primaryButton" name={name} onClick={onClick}>
    {text}
  </button>
);

PrimaryButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default PrimaryButton;
