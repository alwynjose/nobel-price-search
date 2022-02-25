import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className='teal lighten-4'>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center"><span className="grey-text text-darken-3"><i className="material-icons">account_balance</i>Nobel Prize Search</span></a>
                </div>
            </nav>
        )
    }
}

export default Header;