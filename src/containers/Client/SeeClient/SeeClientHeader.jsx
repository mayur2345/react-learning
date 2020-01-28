import React from 'react';
import '../../../scss/SeeClientHeader.scss';

const SeeClientHeader = () => (
    <div className='base'>
        <div className='see-client-header-top'>
            <div className='header-left-wrapper'>
                <i
                    onClick={() => {
                        window.history.back();
                    }}
                    className="fa fa-arrow-circle-left arrowBackClientHeader"
                />
                <h1 className='see-client-header-name autoWidth'>
                    Erlan Belekov
                </h1>
                <div className='see-client-header-status'>
                    <p>Active</p>
                </div>
            </div>
            <div className='id-wrapper'>
                <h1 className='client-header-top-id'>ID 209019</h1>
            </div>
        </div>
        
    </div>
);

export default SeeClientHeader;
