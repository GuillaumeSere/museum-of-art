'use client';

import React from 'react';
import GameList from './components/GameList';
import Header from './components/header';
import Description from './components/Description';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Video from './components/Video';

export default function Home() {
    return (
        <>
            <Header />
            <Video />
            <div className='container mx-auto px-4 py-8'>
                <Description />
                <GameList />
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

