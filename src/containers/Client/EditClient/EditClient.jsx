import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "../../../scss/AddClient.scss";
import PATH from '../../../properties/paths';
import ButtonPageHeader from '../../../components/Custom/CustomHeaders/ButtonPageHeader';
import { PrimaryInput } from '../../../components/Custom/CustomInputs/PrimaryInput';
import PrimaryButton from '../../../components/Custom/CustomButtons/PrimaryButton';
import SecondaryButton from '../../../components/Custom/CustomButtons/SecondaryButton';

const EditClients = props => {
    const [client, setClient] = useState({})
    const [isChecked, setIsChecked] = useState(true)

    useEffect(() => {
        const { id } = props.match.params;
        setClient({
            accountManager: "Yaroslav Prubniak",
            company: "The Gradient",
            email: "pattymassey@gmail.com",
            secondEmail: "pattymassey@gmail.com",
            fullName: "Patty Massey",
            firstName: "Patty",
            lastName: "Massey",
            phone: "+10930193014480148",
            id: "0000000",
            numberOfSpaces: 12,
            status: true,

        });
    }, [])

    const onInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        const copyClient = client;
        // const copyState = this.state;
        switch (name) {
            case 'firstName': {
                copyClient.firstName = value;
                break;
            }
            case 'lastName': {
                copyClient.lastName = value;
                break;
            }
            case 'phone': {
                copyClient.phone = value;
                break;
            }
            case 'email': {
                copyClient.email = value;
                break;
            }
            case 'secondEmail': {
                copyClient.secondEmail = value;
                break;
            }
            case 'companyName': {
                copyClient.companyName = value;
                break;
            }
            case 'accountManager': {
                copyClient.accountManager = value;
                break;
            }
            case 'contractId': {
                copyClient.contractId = value;
                break;
            }
            default:
                return;
        }
        setClient({ copyClient });
    }

    const onCancel = () => { window.history.back() }

    // Fire call to API, with client's change/unchanged data in state
    const onSave = async () => {
        window.location.replace('http://localhost:3000/clients');
    }

    return (
        <div className="pageWrapper">
            <ButtonPageHeader text={`Edit client / ${client.fullName}`} backPath={PATH.clients} />
            <div className="horizontalLine"></div>
            <div className="add-client-scroller">
                <div className=" flexContainer">
                    <h3 className="addClientGroupName">Contact person</h3>
                    <div className="addClientInputsWrapper">
                        <div className="flexContainer row m-0">
                            <div className="firstNameDiv col">
                                <PrimaryInput type="text" spanText="First name *" name="firstName" onChange={onInputChange} value={client.firstName}></PrimaryInput>
                            </div>
                            <div className="secondNameDiv col">
                                <PrimaryInput type="text" spanText="Last name *" name="lastName" onChange={onInputChange} value={client.lastName}></PrimaryInput>
                            </div>
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Phone" name="phone" onChange={onInputChange} value={client.phone}></PrimaryInput>
                        </div>

                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="email" spanText="Email *" name="email" onChange={onInputChange} value={client.email}></PrimaryInput>
                        </div>

                        {isChecked ? <div className="col">
                            <PrimaryInput type="email" spanText="Secondary Email *" name="secondEmail" onChange={onInputChange} value={client.secondEmail}></PrimaryInput>
                        </div> : null}
                    </div>
                </div>
                <div className="smallHorizontalLine"></div>
                <div className="addClientCompany flexContainer">
                    <h3 className="addClientGroupName">Company</h3>
                    <div className="addCompanyInputsWrapper">
                        <div className="col">
                            <PrimaryInput type="text" spanText="Company name *" name="companyName" onChange={onInputChange} value={client.company}></PrimaryInput>
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Account Manager *" name="accountManager" onChange={onInputChange} value={client.accountManager}></PrimaryInput>
                        </div>
                        <div className="paddingTop075Rem col">
                            <PrimaryInput type="text" spanText="Contract ID" name="contractId" onChange={onInputChange} value={client.contractId}></PrimaryInput>
                        </div>
                    </div>
                </div>
                <div className="smallHorizontalLine"></div>
                <div className="lineWrapper">
                    <div className="fullHorizontalLine"></div>
                </div>
            </div>

            <div className="buttonsWrapper flexContainer">
                <SecondaryButton name="cancelBtn" text="Cancel" onClick={onCancel}></SecondaryButton>

                <PrimaryButton name="saveBtn" text="Save" onClick={onSave}></PrimaryButton>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    client: state.client.client,
});

export default connect(mapStateToProps, null)(EditClients);
