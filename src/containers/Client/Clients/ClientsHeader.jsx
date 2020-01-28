import React from "react";
import { Link } from 'react-router-dom';

import PATH from '../../../properties/paths';

const ClientsHeader = (props) => {
    return (
        <div className="row">
            <div className="col-4">
                <div className="searchInputWrapper">
                    {/* <span className="inputLabel">Search by...</span> */}
                    <input
                        className="searchInput"
                        type="text"
                        placeholder="Search by..."
                    />
                    <i className="fa fa-search inputIcon" />
                </div>
            </div>

            <div className="col-8 paddingRight12PX">
                <div className="addClientBtnWrapper">
                    <Link to={PATH.addClient}>
                        <button className="addClientBtn">Add client</button>
                    </Link>
                </div>
                <div
                    className="statusWrapper"
                    onClick={props.toggleStatusFilter}
                    ref={props.filterStatusRef}>
                    {props.statusFilter ? (
                        <div className="filters">
                            <div className="filters-overlay-base">
                                <div
                                    className="filter firstFilter"
                                    onClick={() => {
                                        props.setDefaultStatusFilter();
                                        props.setStatusFilterName('');
                                    }}>
                                    <span className="statusSpan1">Default</span>
                                    <span className="statusSpan2">All Statuses</span>
                                </div>
                                <div
                                    className="filter"
                                    onClick={() => {
                                        props.changeFilterActiveStatus(true);
                                        props.setStatusFilterName('Active');
                                    }}>
                                    <span className="statusSpan1">Status</span>
                                    <span className="statusSpan2">Active</span>
                                </div>
                                <div
                                    className="filter"
                                    onClick={() => {
                                        props.changeFilterActiveStatus(false);
                                        props.setStatusFilterName('Not Active');
                                    }}>
                                    <span className="statusSpan1">Status</span>
                                    <span className="statusSpan2">Not Active</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="status">
                                <div>
                                    <span className="statusSpan1">Status</span>
                                    <span className="statusSpan2">
                                        {props.statusFilterName ? props.statusFilterName : 'All Statuses'}
                                    </span>
                                    <div className="fa fa-caret-down statusArrow"></div>
                                </div>
                            </div>
                        )}
                </div>
                <div
                    className="accountManagerWrapper"
                    onClick={props.toggleManagerFilter}
                    ref={props.filterManagerRef}
                // ref={node => (this.managerFilterNode = node)}
                >
                    {props.managerFilter ? (
                        <div className="filters">
                            <div className="filters-overlay-base">
                                <div
                                    className="filter firstFilter"
                                    onClick={() => {
                                        props.setDefaultStatusFilter();
                                        props.setManagerFilterName('');
                                    }}>
                                    <span className="statusSpan1">Default</span>
                                    <span className="statusSpan2">All Managers</span>
                                </div>
                                {[
                                    ...new Set(props.fetched.map(value => value.accountManager))
                                ].map(manager => {
                                    return (
                                        <div
                                            key={manager}
                                            className="filter"
                                            onClick={() => {
                                                props.filterManager(manager);
                                                props.setManagerFilterName(manager);
                                            }}
                                        >
                                            <span className="statusSpan1">Account Manager</span>
                                            <span className="filterObj">{manager}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                            <div className="accountManager">
                                <div>
                                    <span className="accountManagerSpan1">Account manager</span>
                                    <span className="accountManagerSpan2">
                                        {props.managerFilterName ? props.managerFilterName : 'All Managers'}
                                    </span>
                                    <div className="fa fa-caret-down accountManagerArrow"></div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ClientsHeader;