import React from 'react';

import Xini_Icon_White from '../images/xini-icon-white.png';
import Menu_Icon from '../images/menu-icon.png';

const Header = () => {
    return (
        <div className="header">
            <div className="header__icon">
                <img src={Xini_Icon_White}/>
                XINI
            </div>
            <div className="header__menu">
                <img src={Menu_Icon}/>
            </div>
        </div>
    );
}

export default Header;