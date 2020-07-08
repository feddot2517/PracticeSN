import React from 'react';
import Sky from './sky';
import Ground from './ground';
import CannonBase from './cannon-base';
import CannonPipe from './cannon-pipe';

const Canvas = () => {
    const viewBox = [window.innerWidth / -2, 500 - window.innerHeight, window.innerWidth, window.innerHeight];
    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax none"
            viewBox={viewBox}
        >
            <Sky />
            <Ground />
            <CannonPipe rotation={45} />
            <CannonBase />
        </svg>
    );
};

export default Canvas;