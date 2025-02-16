import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/automations'

const  Chip = () => {
    const videoRef = useRef();
    useGSAP(() =>{
        gsap.from('#chip',{
            scrollTrigger:{
                trigger:'#chip',
                start: '20% bottom', 
                toggleActions:'play pause none restart',
            },
            opacity:0,
            scale:2,
            duration:2,
            ease:'power2.inOut'

        })
        animateWithGsap(".g_fadeIn",{opacity:1, y:0, ease:'power2.inOut', duration:1})
        
    },[])
  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <div id='chip' className='my-20 flex-center w-full'>
                <img src={chipImg} alt="chip" width={180} height={180} />
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='hiw-title'>
                    A17 Pro Chip.
                    <br /> A monster win for Gaming
                </h2>
                <p className='hiw-subtitle'>
                    It's here. The biggest redesign in the history of Apple GPUS.
                </p>
            </div>
            <div className='mt-10 md:mt-20 mb-14'>
                <div className='relative h-full flex items-center justify-center'>
                    <div className='overflow-hidden'>
                        <img src={frameImg} alt="frame" className='bg-transparent z-10' />
                    </div>
                    <div className='hiw-video'>
                            <video className='pointer-events-none' playsInline preload='none'
                            muted autoPlay ref={videoRef}>
                                <source src={frameVideo}/>
                            </video>
                    </div>
                </div>
                <p className='font-semibold text-gray-500 text-center
                                mt-3'>
                    Honkai: Star Rail
                </p>
                </div>
                <div className='hiw-text-container'>
                    <div className='flex-1 flex flex-col justify-center'>
                        <p className='hiw-text g_fadeIn'>
                            A17 Pro is an entirely new class of iPhone
                            chip that delivers our {' '}
                            <span className='text-white'>
                                best graphics performance by far
                            </span>.
                        </p>
                    
                        <p className='hiw-text g_fadeIn'>
                            Mobile {' '}
                            <span className='text-white'>
                            games will look and feel so immersive
                            </span>,
                            with incredibly detailed 
                            environments and characters.
                        </p>
                    </div>
                <div className='flex-1 flex justify-center flex-col g_fadeIn'>
                    <p className='hiw-text'> New</p>
                    <p className='hiw-bigtext'> Pro-class GPU</p>
                    <p className='hiw-text'> With 8 cores</p>

                </div>
                </div>
        </div>
    </section>
  )
}

export default  Chip