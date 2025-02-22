import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='py-5 px-5 sm:px-10'>
        <div className='screen-max-width'>
            <div>
                <p className='font-semibold text-gray-400 text-xs '>
                    More ways to shop: {' '} 
                    <span className='underline text-blue-800 '>
                    Find an Apple Store {' '}
                    </span>
                    or {' '} 
                    <span className='underline text-blue-800 '>
                    other retailer
                    </span> {' '} 
                    near you.
                </p>
                <p className='font-semibold text-gray-400 text-xs '>
                    Or call 000800-040-1966 
                </p>
            </div>
            <div className='bg-neutral-700 my-5 h-[1px] w-full'/>
            <div className='flex flex-col justify-between md:flex-row md:items-center '>
                <p className='font-semibold text-gray-400 text-xs '> Copyright @ 2024
                    Inc. All rights reserved.
                </p>
                <div className='flex'>
                    {footerLinks.map((link,i) => 
                        (
                            <p key={link} className='font-semibold text-gray-400 text-xs'>
                                {link}{' '}
                                {i !== footerLinks.length -1 && (
                                    <span className='mx-2'> | </span>
                                )}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer