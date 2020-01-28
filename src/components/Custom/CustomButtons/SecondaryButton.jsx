import React from 'react';
import PropTypes, { string, object } from 'prop-types';
import '../../../scss/CustomButtons.scss';

const SecondaryButton = ({ text, name, onClick, margin }) => (
  <button
    type="button"
    className="secondaryButton"
    name={name}
    onClick={onClick}
    style={margin ? { margin } : {}}
  >
    {text}
  </button>
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  margin: PropTypes.oneOf([string, object]).isRequired
};

export default SecondaryButton;
