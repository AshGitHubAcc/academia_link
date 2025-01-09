
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TextField from '@mui/material/TextField';
import test_logo from '../assets/test_logo.svg';
import { useState, useEffect } from 'react';

export default function Header() {
    // const [settingsOpened, setSettingsOpened] = useState(false)
    
    

    return (
    <header className="bg-[#171717] p-2 h-16 flex justify-around items-center text-[#ECECEC]">

        <div className='flex-1 flex gap-5 justify-start items-center h-full'>

            <div className='px-2 ml-5 mr-10 flex items-center justify-center
                 activate-effect hover:scale-x-150 transition-transform duration-500 ease-in-out
            '>
                <span className="material-symbols-outlined text-[#989494] text-3xl">menu</span>
            </div>
            
            <div className='flex gap-5 justify-center items-center px-5 hover:scale-105 transition-all duration-500 hover:cursor-pointer'>
                <img src={test_logo} alt="website logo" className='w-9  oll-in-blurred-left'/>
                <p className='font-bold text-[#a6a2a2] text-xl'>Website Logo</p>
            </div>
        </div>

        <div className=' flex-1 h-full flex justify-center items-center '>
            <input type="text" placeholder='Search...' className='
            bg-[#1e1f1f] w-[80%] h-8 rounded-sm px-5 border-b-2 border-gray-600
            placeholder:text-[#78787c]
             focus:bg-[#838485] hover:bg-[#838485] transition-all duration-700 ease-in-out p-2  outline-none
             focus:placeholder:text-[#838485] hover:placeholder:text-[#000000] placeholder:duration-500
             placeholder:transition-colors text-gray-400 text-center hover:text-black focus:text-black
             hover:w-full focus:w-full  

            '  />

        </div>
        <div className=' flex-1 h-full flex justify-end items-center'>
            <div className=' mr-10 flex gap-5'>
            <button>Login</button>
            <button>Signup</button>
            </div>

        </div>
    </header>
    )
}