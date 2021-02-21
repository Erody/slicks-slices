import React from 'react';
import CurrentlySlicing from '../components/CurrentlySlicing';
import HotSlices from '../components/HotSlices';
import useLatestData from '../utils/useLatestData';

export default function HomePage() {
    const { slicemasters, hotSlices } = useLatestData();
    return (
        <div className="center">
            <h1>The Best Pizza Downtown!</h1>
            <p>Open 11 am to 11pm Everz Single Day</p>
            <div>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </div>
        </div>
    );
}
