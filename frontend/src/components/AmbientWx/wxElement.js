import React from 'react';

const WxElement = ({ wxType, wxElement, wxBgColor }) => (
    <div className="col s4">
        <div className={`card small ${wxBgColor} hoverable`}>
            <div className="card-content">
                <span class="card-title">{wxType}</span>
                {wxElement.map((item, i) => <p className={item[1]} key={i}>{item[0]}</p>)}
            </div>
        </div>
    </div>
);

export default WxElement;