import React, { useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {heroVideo, smallHeroVideo} from '../utils'

const Hero = () => {
  const [videoSRC, setVideoSRC] = useState(window.innerWidth < 760? smallHeroVideo:heroVideo)

  const handleVideoSRC = () =>{
    if(window.innerWidth < 760){
      setVideoSRC(smallHeroVideo)
    }else{
      setVideoSRC(heroVideo)
    }
  }
  useEffect(()=> {
    window.addEventListener('resize', handleVideoSRC);
    //clean up hook for future use
    return ()=>{
      window.removeEventListener('resize', handleVideoSRC)
    }
  }, [])

  useGSAP(() => {
     gsap.to("#hero", {
      opacity:1,
      delay:2,
      duration:4,
     })

     gsap.to('#cta',{
      // translateY:0,
      opacity: 1,
      delay:1.5,
      duration: 2,
      y:-50,
     })
  }, [])
  return (
    <section className='w-full nav-height bg-black position-relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id='hero' className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSRC}>
            <source src={videoSRC} type='video/mp4'/>
          </video>
        </div>
      </div>
      <div
      id='cta'
      className='flex flex-col items-center opacity-0 translate-y-20'>
      <a href="#highlights" className='btn'>Buy</a>
      <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero;