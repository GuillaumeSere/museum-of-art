'use client';

import React from 'react';
import GameList from './components/GameList';
import Header from './components/Header';
import Description from './components/Description';
import Footer from './components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <Description />
                <GameList />
            </div>
            <Footer />
        </>
    );
}

