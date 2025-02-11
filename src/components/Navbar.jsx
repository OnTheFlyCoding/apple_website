import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (

    <header className='w-full py-5 px-5 sm:px-10 flex justify-between 
    items-center'>
      <nav className='flex w-full screen-max-width'>
      <img src={appleImg} alt="" />
      <div className='flex flex-1 gap-5 justify-center max-sm:hidden'>
        {navLists.map((navElement) => (
          <div key={navElement} className=' text-sm cursor-pointer text-gray-400
          hover:text-white transition-all'>
            {navElement}
          </div>
        ))}
      </div>
      <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
        <img src={searchImg} alt="Search" width={18} height={18} />
        <img src={bagImg} alt="Bag Image" width={18} height={18} />
      </div>
      </nav>
    </header>

  )
}

export default Navbar;