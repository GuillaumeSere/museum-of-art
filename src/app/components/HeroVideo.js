import React, { useState, useEffect } from 'react'
import Description from './Description'

const videoData = [
  {
    id: 1,
    src: '/video/video1.mp4',
    title: 'Vidéo 1',
  },
  {
    id: 2,
    src: '/video/video2.mp4',
    title: 'Vidéo 2',
  },
  {
    id: 3,
    src: '/video/video3.mp4',
    title: 'Vidéo 3',
  },
  {
    id: 4,
    src: '/video/video4.mp4',
    title: 'Vidéo 4',
  },
]

const HeroVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videoData.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000) // Change toutes les 10 secondes

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full relative h-screen">
      <video
        key={videoData[currentVideoIndex].id} // Important : force le rechargement de la vidéo
        className="w-full h-full object-cover absolute inset-0"
        autoPlay
        muted
        loop={false} // On désactive la boucle car on veut changer de vidéo
        playsInline
        preload="metadata"
        aria-label={videoData[currentVideoIndex].title}
      >
        <source src={videoData[currentVideoIndex].src} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      <div className="absolute container mx-auto inset-0">
        {/* Overlay optionnel pour améliorer la lisibilité du texte si nécessaire */}
        <Description />
      </div>
    </section>
  )
}

export default HeroVideo 