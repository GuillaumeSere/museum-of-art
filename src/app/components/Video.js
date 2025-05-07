import React, { useMemo } from 'react'

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

const VideoItem = React.memo(({ video }) => {
  return (
    <div 
      className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.title}
        loading="lazy"
      >
        <source src={video.src} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  )
})

VideoItem.displayName = 'VideoItem'

const Video = () => {
  const memoizedVideos = useMemo(() => {
    return videoData.map((video) => (
      <VideoItem key={video.id} video={video} />
    ))
  }, [])

  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memoizedVideos}
      </div>
    </section>
  )
}

export default Video
