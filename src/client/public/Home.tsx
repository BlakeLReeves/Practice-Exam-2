import * as React from 'react';

export interface IHomeProps { }

export interface IHomeState { }

export default class IHome extends React.Component<IHomeProps, IHomeState> {
    render() { 
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1 className="display-3 text-info text-center">Welcome to The Bookstore!</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}