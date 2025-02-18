'use client';

import React from 'react';
import GameList from './components/GameList';
import Header from './components/header';

export default function Home() {
    return (
        <>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <GameList />
            </div>
        </>
    );
}

