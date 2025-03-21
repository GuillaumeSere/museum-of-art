import React from 'react'

const videoData = [
  {
    id: 1,
    src: '/video/video5.mp4',
    title: 'Vidéo 5',
  },
  {
    id: 2,
    src: '/video/video6.mp4',
    title: 'Vidéo 6',
  },
  {
    id: 3,
    src: '/video/video7.mp4',
    title: 'Vidéo 7',
  },
]

const Video = () => {
  return (
    <section className="container video-box mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {videoData.map((video) => (
          <div 
            key={video.id}
            className="rounded overflow-hidden"
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
