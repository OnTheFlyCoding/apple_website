import React, { useState,useEffect, useRef } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
    //video to reference, changes as state changes
    const videoRef = useRef([]);
    //span of referenced video
    const videoSpanRef = useRef([]);
    //div of referenced video
    const videoDivRef = useRef([]);


    const [video, setVideo] = useState({
        isEnd:false,
        startPlay:false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false,
    })
    
    const [loadedData,setLoadedData] = useState([]);
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;
    
    //Control animation of the carousel
    // and videos
    useGSAP(()=> {
        gsap.to('#slider',{
            transform: `translateX(${-100 *videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })

        //Once container is in the view of the window
        gsap.to('#video',{
            scrollTrigger:{
                trigger:'#video',
                toggleActions:'restart none none none'
            },
            onComplete:()=>{
                setVideo((pre) => ({
                    ...pre,
                    startPlay:true,
                    isPlaying:true,
                }))
            }
        })
    },[isEnd, videoId])


    //For the actual playing of the video
    useEffect(() =>{
        //once all meta data needed for the videos
        if(loadedData.length > 3){
            //isPlaying property set to false
            if(!isPlaying){
                videoRef.current[videoId].pause();
            }else{
                startPlay &&videoRef.current[videoId].play();
            }
        }
    },[videoId, startPlay, isPlaying, loadedData])
    
    //Once Meta data from videos have been received,
    // initiate the first video to play
    const handleLoadedMetaData = (i,e) => setLoadedData((pre) => [...pre, e])
    
    //progress bar inside button
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]){
            // animation progress bar logic begins
            let anim = gsap.to(span[videoId],{
                //everytime a new animation starts(new video rotated)
                //videoId or StartPlay has changed
                onUpdate: ()=>{
                    const progress = Math.ceil(anim.progress()*100);
                    if(progress != currentProgress){
                        currentProgress = progress;
                        //animate the proper width depending on screen size
                        gsap.to(videoDivRef.current[videoId],{
                            width:window.innerWidth < 760
                            ? '10vw'
                            : window.innerWidth <1200?
                            '10vw':'4vw'
                        })
                        //video button- progress bar forEach picture
                        gsap.to(span[videoId], {
                            width:`${currentProgress}%`,
                            backgroundColor:'white'
                        })
                    }
                },
                //Once the animation completes(adjustProper width)
                onComplete: ()=>{
                    if(isPlaying){

                        gsap.to(videoDivRef.current[videoId],{
                            width:'12px',
                        })
                        //button span that displays icon 
                        //play, pause, repeat
                        gsap.to(span[videoId],{
                            backgroundColor: 'afafaf'
                        })
                    }
                }
            })//exit animation logic

            //if returned to the first video
            if(videoId === 0){
                anim.restart();
            }
            //update inRealTime progress bar variable
            const animBarUpdate = ()=>{
            anim.progress(videoRef.current[videoId].currentTime/hightlightsSlides[videoId].videoDuration)
            }
            //actively update the bar 
            if(isPlaying){
                gsap.ticker.add(animBarUpdate)
            }
        }

    }, [videoId, startPlay])
    
    //Handle Vids and its pro perties so functions will
    //use their states based on these results
    const handleProcess = (type, i) =>{
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo,
                    isEnd: true, videoId: i +1}))
                
                break;
            case 'video-last':
                setVideo((prevVideo) => ({...prevVideo,
                    isLastVideo:true}))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo,
                    isLastVideo: false, videoId:0}))
                break;
            case 'play':
                setVideo((prevVideo) => ({...prevVideo,
                    isPlaying: !prevVideo.isPlaying}))
                    break;
            case 'pause':
                setVideo((prevVideo) => ({...prevVideo,
                    isPlaying: !prevVideo.isPlaying}))
                    break;
             default:
                return video;
        }
    }
    

  return (
    <>
        <div className='flex items-center'>
           {hightlightsSlides.map((list, i) =>(
            <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                <div className='video-carousel_container'>
                    <div className='w-full h-full flex rounded-3xl
                    overflow-hidden bg-black'>
                        <video
                        id='video'
                        preload='auto'
                        muted
                        className={`${
                            list.id ===2 && 'translate-x-44'}
                            pointer-events-none    
                        `}
                        playsInline={true}
                        ref={(el) => (videoRef.current[i] = el)}
                        onEnded={() =>
                            i !== 3?
                            handleProcess('video-end', i)
                            : handleProcess('video-last')
                        }
                        onPlay={() =>{
                            setVideo((prevVideo)=> ({
                                ...prevVideo, isPlaying:true
                            }))
                        }}
                        onLoadedMetadata={(e) => handleLoadedMetaData(i,e)}
                        >
                            <source src={list.video} type='video/mp4' />
                        </video>
                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text) =>(
                                <p key={text} className='md:text-2xl text-xl font-medium'>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           ))}
        </div>
        <div className='relative flex mt-10'>
            <div className='flex py-5 px-7 bg-gray-400 backdrop-blur rounded-full'>
                {videoRef.current.map((_, i) =>(
                    <span
                    key={i}
                    ref={(el) => (videoDivRef.current[i] = el)}
                    className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                    >
                    <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)}/>
                    </span>
                ))}
            </div>
            <button className='control-btn'>
                <img src={isLastVideo? replayImg:
                    !isPlaying? playImg: pauseImg}
                    alt={isLastVideo? 'replay':
                    !isPlaying? 'play':'pause'} 
                    onClick={isLastVideo? 
                        () => handleProcess('video-reset'):
                        !isPlaying?
                        () => handleProcess('play'):
                        () => handleProcess('pause')
                    }
                    />
            </button>

        </div>
    </>
  )
}

export default VideoCarousel