import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title',{
      y:0,
      opacity:1,

    })
    gsap.to('.link',{
      opacity:1,
      y:0,
      stagger: .25,
      duration:1.3
    })
  }, [])
  return (
    <section id='highlights' className='w-screen 
    overflow-hidden h-full common-padding bg-zinc-900'>
      <div className='screen-max-width'>

        <div className='mb-12 w-full items-end justify-between md:flex'>
          <h1 id='title' className='section-heading'> Get the highlights.</h1>
          {/* container for holding links inline with title */}
          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch The Film
              <img src={watchImg} alt="watch" className='ml-2' />
            </p>
            <p className='link'>
              Watch The Event
              <img src={rightImg} alt="watch" className='ml-2' />
            </p>
          </div>
        </div>
        <VideoCarousel/>
        
      </div>
    </section>
  )
}

export default Highlights;