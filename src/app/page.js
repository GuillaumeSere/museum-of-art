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
            <GameList />
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

