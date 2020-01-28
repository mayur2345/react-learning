import React, { Component } from 'react';
import '../../../scss/CustomInputs.scss';
import { arrayOf, any, string, func, object, bool } from 'prop-types';

export const PrimaryInput = ({
  spanText,
  name,
  type,
  onChange,
  value
}) => (
  <div className="primaryInputDiv">
    <span className="firstNameSpan">{spanText}</span>

    <input
      className="firstNameInput"
      type={type}
      name={name}
      onChange={onChange}
      value={value}
    />
  </div>
);

PrimaryInput.propTypes = {
  spanText: string.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired
};

export const SecondaryInput = ({
  spanText,
  name,
  type,
  onChange,
  value
}) => (
  <div className="secInputWrapper">
    <span className="secInputSpanText">{spanText}</span>

    <input
      className="secInput"
      type={type}
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
);

SecondaryInput.propTypes = {
  spanText: string.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired
};

export const ValidationSecondaryInput = ({
  spanText,
  icon,
  name,
  type,
  onChange,
  value,
  locked
}) => (
  <div
    className={locked ? 'valSecInput editManagerLockedInput' : 'valSecInput'}
  >
    <div className="inputLeftPart">
      <span className="secInputSpanText">{spanText}</span>

      <input
        readOnly={!!locked}
        className="secInput"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
    {icon}
  </div>
);

ValidationSecondaryInput.propTypes = {
  spanText: string.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired,
  locked: bool.isRequired,
  icon: any.isRequired
};

export class SecondarySelect extends Component {
  state = {
    showOptions: false
  };

  toggleOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  };

  render() {
    const { showOptions } = this.state;

    const {
      options,
      spanText,
      type,
      value,
      onChange,
      name,
      style,
      locked
    } = this.props;

    return (
      <>
        <div
          className={
            locked ? 'valSecInput editManagerLockedInput' : 'valSecInput'
          }
          style={style || {}}
        >
          <div className="inputLeftPart">
            <span className="secInputSpanText">{spanText}</span>

            <input
              readOnly={!!locked}
              className={locked ? 'secInputLocked' : 'secInput'}
              type={type}
              value={value}
              onChange={onChange}
              name={name}
            />
            {showOptions ? (
              <div className="selectOptionsWrapper">
                {options?.map(element => (
                  <div className="option">
                    <span className="optionValue">{element.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <button
            onClick={locked ? () => {} : this.toggleOptions}
            type="button"
            className={locked ? 'lockedCursor' : ''}
          >
            <i className="fa fa-caret-down" />
          </button>
        </div>
      </>
    );
  }
}

SecondarySelect.propTypes = {
  options: arrayOf(any).isRequired,
  spanText: string.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired,
  style: object.isRequired,
  locked: bool.isRequired
};
