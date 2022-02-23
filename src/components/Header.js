import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className='teal lighten-4'>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo center"><span className="grey-text text-darken-3"><i class="material-icons">account_balance</i>Nobel Prize Search</span></a>
                </div>
            </nav>
        )
    }
}

export default Header;