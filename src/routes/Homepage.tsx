import React from 'react';

import Xini_Icon_White from '../images/xini-icon-white.png';
import Menu_Icon from '../images/menu-icon.png';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage__header">
                <div className="homepage__header__icon">
                    <img src={Xini_Icon_White}/>
                    XINI
                </div>
                <div className="homepage__header__menu">
                    <img src={Menu_Icon}/>
                </div>
            </div>
            <div className="homepage__titles">
                <div className="homepage__titles__title">
                    XINI
                </div>
                <div className="homepage__titles__subtitle">
                    <hr className="homepage__titles__subtitle__line"/>
                    Designer • Developer • Creator
                </div>
            </div>
        </div>
    );
}

export default Homepage;