import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../../scss/SeeClientHeader.scss';

const DataElement = props =>
    <div className={props.first ? `client-header-data-element-first` : `client-header-data-element`}>
        <p className='client-header-data-element-key'>{props.colKey}</p>
        {
            props.linkValue ?
                <Link to={props.link}>
                    <p className='client-header-data-element-value-link'>{props.value}</p>
                </Link>
                :
                props.customValue ||
                <p className='client-header-data-element-value'>{props.value}</p>
        }
    </div>
    ;

const SecondaryButton = ({ text, onClick, first }) =>
    <button
        onClick={onClick}
        className={`${first ? 'see-client-secondary-button' : 'see-client-secondary-button buttonLeftMargin'}`}>
        {text}
    </button>;

const SeeClientBody = props => {
    return (
        <Fragment>
            <div className='see-client-header-data base'>
                <DataElement colKey='Contract ID' value='#980414' first />
                <DataElement colKey='Company' value='The Gradient' />
                <DataElement colKey='Email' value='belekoverlanhehe@gmail.com' />
                <DataElement colKey='Phone' value='+000 000 0000 0000' />
                <DataElement colKey='Account Manager' value='Upile Chasowa' linkValue link={'/clients'} />
                <DataElement colKey='Created date/time' value='19 Feb 2020 19:22' />
                <div style={{ flex: 2 }} />
                <DataElement colKey='Last Update'
                    customValue={
                        <p className='client-header-data-element-value'>19 Feb 2020 19:22 by&ensp;
                        <Link to='/clients' className='client-header-data-element-value-link'>
                                Robert Kawasaki
                        </Link>
                        </p>
                    }
                />
            </div>
            <div className='see-client-header-buttons base-body'>
                <SecondaryButton
                    text='Edit'
                    onClick={() => { }}
                    first
                />
                <SecondaryButton
                    text='Deactivate'
                    onClick={() => { }}
                />
                <SecondaryButton
                    text={
                        <i className='fa fa-trash' />
                    }
                    onClick={() => { }}
                />
            </div>
            <div className="horizontalLine lineMargin" style={{ width: '100%', marginLeft: 0, marginRight: 0 }}></div>
        </Fragment>
    );
}

export default SeeClientBody;