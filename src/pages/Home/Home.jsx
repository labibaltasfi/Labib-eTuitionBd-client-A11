import React from 'react';
import Banner from './Banner';
import DemoUser from './DemoUser';
import ScrollButtons from './ScrollButtons';
import LatestTuitionPosts from './LatestTuitionPosts';
import LatestTutors from './LatestTutors';

function Home() {
    return (
        <div className='xl:w-9/12 mx-auto'>
            <Banner></Banner>
            <LatestTuitionPosts limit={6}></LatestTuitionPosts>
            <LatestTutors></LatestTutors>
            <DemoUser></DemoUser>
            <ScrollButtons></ScrollButtons>
        </div>
    );
}

export default Home;