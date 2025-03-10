'use client';

import React from 'react';
import GameList from './components/GameList';
import Header from './components/header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import HeroVideo from './components/HeroVideo';

export default function Home() {
    return (
        <>
            <Header />
            <HeroVideo />
            <div className='container mx-auto px-4 py-8'>
                <GameList />
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

