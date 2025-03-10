import React from 'react'

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
]

const Video = () => {
  return (
    <section className="container video-box mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {videoData.map((video) => (
          <div 
            key={video.id}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <video
              className="video w-full pt-4"
              autoPlay
              muted
              loop
              preload="metadata"
              aria-label={video.title}
            >
              <source src={video.src} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Video
