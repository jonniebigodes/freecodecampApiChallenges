import React, { Component } from 'react';
//import classnames from 'classnames';
export default class NotFound extends Component{
    //static propTypes = {};
    //static defaultProps = {};
    //state = {};
    render(){
        //const { className, ...props } = this.props;
        return (
           // <div className={classnames('NotFound', className)} {...props}>
           <div className="NotFound">
                <h1>
                    404 <small> upsy daisy the item was not found :(</small>
                </h1>
            </div>
        );
    }
}