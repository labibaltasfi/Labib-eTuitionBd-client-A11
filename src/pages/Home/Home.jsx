import React from 'react';
import Banner from './Banner';
import DemoUser from './DemoUser';
import ScrollButtons from './ScrollButtons';

function Home() {
    return (
        <div className='w-9/12 mx-auto'>
            <Banner></Banner>
            <ScrollButtons></ScrollButtons>
        </div>
    );
}

export default Home;