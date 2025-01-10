
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import test_logo from '../assets/test_logo.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const settingsOptions = [
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'Logout',
]




export default function Header() {
    const [settingsOpened, setSettingsOpened] = useState(false)

    function eventMenuClicked() {
        setSettingsOpened(!settingsOpened)
    }




    return (
    <header className="bg-[#171717] p-2 h-16 flex justify-around items-center text-[#ECECEC] relative">

        <div className='flex-1 flex gap-5 justify-start items-center h-full'>

            <div onClick={eventMenuClicked} className='px-2 ml-5 mr-10 flex items-center justify-center
                 activate-effect hover:scale-x-150 transition-transform duration-500 ease-in-ou hover:cursor-pointer
            '>
                <span className="material-symbols-outlined text-[#989494] text-3xl">menu</span>
            </div>
            <div className={`absolute top-[64px] left-0 bg-gray-400 w-[200px] opacity-gradient
                transition-all duration-[500ms] ease-in-out ${settingsOpened ? 'h-[80vh]' :'h-0'}
                flex flex-col gap-0 items-start overflow-hidden
            `}>
                {settingsOptions.map((ele,index)=> (

                    <div className={`w-full text-center 
                        settings-options
                        hover:bg-gray-700 hover:font-extrabold hover:cursor-pointer
                        ${ settingsOpened ? 'opacity-100 py-3' : 'py-0 opacity-0' }
                        ${ele === 'Logout' ? 'text-red-400' : ''}
                    `}>
                            {ele}
                    </div>
                ))

                }
            </div>
            
            <Link to='/home' className='flex gap-5 justify-center items-center px-5 hover:scale-[0.98]
             transition-all duration-500 hover:cursor-pointer hover:!text-[#787474] text-[#a6a2a2]'>
                <img src={test_logo} alt="website logo" className='w-9  oll-in-blurred-left'/>
                <p className='font-bold  text-xl'>Website Logo</p>
            </Link>
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
            <div className=' mr-10 flex gap-3'>

            <Link to='/login'>
                <button className='text-blue-500 '>Login</button>
            </Link>
            <Link to='/singup'>
                <button className='  text-[#bab8b8]'>Signup</button>
            </Link>
            
            </div>

        </div>

    </header>
    )
}