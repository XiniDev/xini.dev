import React, { useEffect, useState } from 'react';

import Xini_Icon_White from '../images/xini-icon-white.png';
import Menu_Icon from '../images/menu-icon.png';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);

    const menuClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (menuActive) {
            setMenuActive(false)
        } else {
            setMenuActive(true)
        }
    };

    return (
        <div className="header-wrapper">
            <div className="header-icon">
                <img src={Xini_Icon_White} alt="XiniDev Icon"/>
                XINI
            </div>
            <div
                className={`header-menu ${menuActive ? 'active' : ''}`}
                onClick={(e) => menuClick(e)}
            >
                <img src={Menu_Icon} alt="Menu Icon"/>
            </div>
        </div>
    );
}

export default Header;