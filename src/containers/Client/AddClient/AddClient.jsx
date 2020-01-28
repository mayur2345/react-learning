import React, { useEffect, useReducer } from 'react';
import '../../../scss/AddClient.scss';
import { FormControlLabel } from '@material-ui/core';

import PATH from '../../../properties/paths';
import { getWorkClubUsers } from "../../../api/Users";
import ButtonPageHeader from '../../../components/Custom/CustomHeaders/ButtonPageHeader';
import { PrimaryInput } from '../../../components/Custom/CustomInputs/PrimaryInput';
import CustomCheckbox from '../../../components/Custom/CustomCheckboxes/CustomCheckbox';
import PrimaryButton from '../../../components/Custom/CustomButtons/PrimaryButton';
import SecondaryButton from '../../../components/Custom/CustomButtons/SecondaryButton';

const types = {
    DATA_FETCHED: 0,
    CHECKBOX_CHANGE: 1,
    UPDATE_FORM_DATA: 2,
    VALIDATE_FORM: 3
}

const addClientReducer = (state, action) => {
    switch (action.type) {
        case types.DATA_FETCHED: {
            return {
                ...state,
                clients: action.clients,
                loading: action.loading
            }
        }
        case types.CHECKBOX_CHANGE: {
            return {
                ...state,
                isChecked: action.isChecked,
                formValidations: {
                    isEmailValid: false,
                    isSecondEmailValid: false
                },
                formErrors: {
                    email: "",
                    secondEmail: "",
                }
            }
        }
        case types.UPDATE_FORM_DATA: {
            return {
                ...state,
                [action.name]: action.value,
            }
        }
        case types.VALIDATE_FORM: {
            return {
                ...state,
                formValid: action.formValid
            }
        }
        default:
            return state;
    }
}

const AddClient = props => {
    useEffect(() => {
        loadWorkClubUsers();
    }, []);

    const initialState = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        secondEmail: "",
        companyName: "",
        accountManager: "",
        contractId: "",
        isChecked: false,
        formErrors:
        {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            secondEmail: "",
            companyName: "",
            accountManager: "",
            contractId: "",
            isChecked: false,
        },
        formValidations:
        {
            isFirstNameValid: false,
            isLastNameValid: false,
            isPhoneValid: false,
            isEmailValid: false,
            isSecondEmailValid: false,
            isCompanyNameValid: false,
            isAccountManagerValid: false,
            isContractIdValid: false,
        },
        formValid: false
    };
    const [state, dispatch] = useReducer(addClientReducer, initialState);

    const loadWorkClubUsers = async () => {
        const member = localStorage.getItem('member');

        const body = {
            "workclubUserId": member.workClubUserID
        };
        const workclubUsers = await getWorkClubUsers(body);
        dispatch({
            type: types.DATA_FETCHED,
            clients: workclubUsers,
            loading: false
        });
    }

    const onCheckboxChange = e => {
        let checked = e.target.checked;
        dispatch({
            type: types.CHECKBOX_CHANGE,
            isChecked: checked,
        });
    }

    const onInputChange = e => {
        const { name, value } = e.target;
        dispatch({
            type: types.UPDATE_FORM_DATA,
            name: value
        });
    }

    const validateFormFields = () => {
        let errors = state.formErrors;
        let validations = state.formValidations;
        let isFormValid = state.formValid;

        if (state.firstName.length === 0) {
            errors.firstName = "First name is required!!";
            validations.isFirstNameValid = false;
        } else {
            errors.firstName = "";
            validations.isFirstNameValid = true;
        }

        if (state.lastName.length === 0) {
            errors.lastName = "Last name is required!!";
            validations.isLastNameValid = false;
        } else {
            errors.lastName = "";
            validations.isLastNameValid = true;
        }

        if (state.isChecked) {
            if (state.secondEmail.length === 0) {
                errors.secondEmail = "Email is required!!";
                validations.isSecondEmailValid = false;
            } else if (!state.secondEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                errors.secondEmail = "Valid email is required";
                validations.isSecondEmailValid = false;
            } else {
                errors.secondEmail = "";
                validations.isSecondEmailValid = true;
            }
        } else {
            if (state.email.length === 0) {
                errors.email = "Email is required!!";
                validations.isEmailValid = false;
            } else if (!state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                errors.email = "Valid email is required";
                validations.isEmailValid = false;
            } else {
                errors.email = "";
                validations.isEmailValid = true;
            }
        }

        if (state.accountManager.length === 0) {
            errors.accountManager = "Account manager details are required!!";
            validations.isAccountManagerValid = false;
        } else {
            errors.accountManager = "";
            validations.isAccountManagerValid = true;
        }

        if (state.companyName.length === 0) {
            errors.companyName = "Company name is required!!";
            validations.isCompanyNameValid = false;
        } else {
            errors.companyName = "";
            validations.isCompanyNameValid = true;
        }

        if (state.contractId.length === 0) {
            errors.contractId = "ContractId is required!!";
            validations.isContractIdValid = false;
        } else {
            errors.contractId = "";
            validations.isContractIdValid = true;
        }

        isFormValid = validations.isFirstNameValid &&
            validations.isLastNameValid &&
            state.isChecked
            ? validations.isSecondEmailValid
            : validations.isEmailValid &&
            validations.isAccountManagerValid &&
            validations.isCompanyNameValid &&
            validations.isContractIdValid;

        dispatch({
            type: types.VALIDATE_FORM,
            formValid: isFormValid,
        });

        if (state.formValid) {
            console.log("Form is valid.");
        } else {
            console.log("Form is not valid.");
        }
    };

    const onSave = e => {
        validateFormFields();
    }

    const onCancel = e => {
        console.log("Cancel clicked!");
    }

    return (
        <div className="pageWrapper">
            <ButtonPageHeader text="Add client" backPath={PATH.clients} />
            <div className="horizontalLine" />

            <div className="add-client-scroller">
                <div className=" flexContainer">
                    <h3 className="addClientGroupName">Contact person</h3>
                    <div className="addClientInputsWrapper">
                        <div className="flexContainer row m-0">
                            <div className="firstNameDiv col">
                                <PrimaryInput type="text" spanText="First name *" name="firstName" onChange={onInputChange} value={state.firstName}></PrimaryInput>
                                {!state.isFirstNameValid && <span className='error'>{state.formErrors.firstName}</span>}
                            </div>
                            <div className="secondNameDiv col">
                                <PrimaryInput type="text" spanText="Last name *" name="lastName" onChange={onInputChange} value={state.lastName}></PrimaryInput>
                                {!state.isLastNameValid && <span className='error'>{state.formErrors.lastName}</span>}
                            </div>
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Phone" name="phone" onChange={onInputChange} value={state.phone}></PrimaryInput>
                        </div>

                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="email" spanText="Email *" name="email" onChange={onInputChange} value={state.email}></PrimaryInput>
                            {!state.isEmailValid && <span className='error'>{state.formErrors.email}</span>}
                        </div>

                        <div className="paddingTop075Rem col">
                            <p className="anotherEmailText">
                                On this email address a link for inital Super Admin account activation will be sent.
                                This email address will also be used as a login for the initial Super Admin account.
                        </p>
                        </div>
                        <div className="paddingTop075Rem col">
                            <FormControlLabel
                                validateFormFields control={
                                    <CustomCheckbox onChange={onCheckboxChange} />
                                }
                                className="checkboxLabel"
                                label="Use another email address as a login for the initial Super Admin account">
                            </FormControlLabel>
                        </div>

                        {state.isChecked ? <div className="col">
                            <PrimaryInput type="email" spanText="Email *" name="secondEmail" onChange={onInputChange} value={state.secondEmail}></PrimaryInput>
                            {!state.isSecondEmailValid && <span className='error'>{state.formErrors.secondEmail}</span>}
                        </div> : null}
                    </div>
                </div>

                <div className="smallHorizontalLine"></div>

                <div className="addClientCompany flexContainer">
                    <h3 className="addClientGroupName">Company</h3>
                    <div className="addCompanyInputsWrapper">
                        <div className="col">
                            <PrimaryInput type="text" spanText="Company name *" name="companyName" onChange={onInputChange} value={state.companyName}></PrimaryInput>
                            {!state.isCompanyNameValid && <span className='error'>{state.formErrors.companyName}</span>}
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Account Manager *" name="accountManager" onChange={onInputChange} value={state.accountManager}></PrimaryInput>
                            {!state.isAccountManagerValid && <span className='error'>{state.formErrors.accountManager}</span>}
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Contract ID" name="contractId" onChange={onInputChange} value={state.contractId}></PrimaryInput>
                            {!state.isContractIdValid && <span className='error'>{state.formErrors.contractId}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttonsWrapper flexContainer">
                <SecondaryButton name="cancelBtn" text="Cancel" onClick={onCancel}></SecondaryButton>

                <PrimaryButton name="saveBtn" text="Save" onClick={onSave}></PrimaryButton>
            </div>
        </div>
    );
};

export default AddClient;