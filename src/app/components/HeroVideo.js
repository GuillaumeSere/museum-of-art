import React from 'react'
import Description from './Description'

const HeroVideo = () => {
  return (
    <section className="w-full relative h-screen">
      <video
        className="w-full h-full object-cover absolute inset-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Vidéo principale"
      >
        <source src="/video/video4.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      <div className="absolute container mx-auto inset-0 bg-black/30">
        {/* Overlay optionnel pour améliorer la lisibilité du texte si nécessaire */}
        <Description />
      </div>
    </section>
  )
}

export default HeroVideo 