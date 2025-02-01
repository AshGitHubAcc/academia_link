import test_logo from '../assets/test_logo.svg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface HeaderProps {
    loginpage?: boolean,
    registerpage?: boolean,
}

const settingsOptions = [
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'asdasdasd',
    'Logout',
]




export default function Header({loginpage, registerpage}: HeaderProps) {
    const navigate = useNavigate()
    const [settingsOpened, setSettingsOpened] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    
    function eventMenuClicked() {
        setSettingsOpened(!settingsOpened)
    }

    function handleSearchSubmit(e) {
        
        if (e.key ==='Enter') {

            const queryStrings = new URLSearchParams(window.location.search)
            const topicId = queryStrings.get('filter_topic_id')

            if (topicId) {
                queryStrings.set('filter_topic_id', topicId)
                
            }
            queryStrings.set('query', searchValue)

            navigate(`/home/?${queryStrings.toString()}`)
        }
    }


    return (
    <header className="bg-[#171717] p-2 h-20 flex justify-around items-center text-[#ECECEC] relativ w-full z-10 text-[120%]">

        <div className='flex-1 flex gap-5 justify-start items-center h-full'>

            {loginpage || registerpage ? <div className='ml-[6.7rem]'></div> : <div onClick={eventMenuClicked} className='px-2 ml-5 mr-10 flex items-center justify-center
                 activate-effect hover:scale-x-150 transition-transform duration-500 ease-in-ou hover:cursor-pointer
            '>
                <span className="material-symbols-outlined text-[#cbc5c5] text-3xl">menu</span>
            </div>}

            <div className={`absolute top-[64px] left-0 bg-gray-400 w-[200px] opacity-gradient
                transition-all duration-[500ms] ease-in-out ${settingsOpened ? 'h-[80vh]' :'h-0'}
                flex flex-col gap-0 items-start overflow-hidden 
            `}>
                {settingsOptions.map((ele,index)=> (

                    <div key={index} className={`w-full text-center 
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
             transition-all duration-500 hover:cursor-pointer hover:!text-[#787474] text-[#cbc5c5]'>
                <img src={test_logo} alt="website logo" className='w-9  oll-in-blurred-left'/>
                <p className='font-bold  text-xl'>Website Logo</p>
            </Link>
        </div>

        <div className=' flex-1 h-full flex justify-center items-center '>

            {loginpage || registerpage ? <div></div> : 
            
            <input onKeyDown={handleSearchSubmit} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
            type="text" placeholder='Search...' className='
            bg-[#1e1f1f] w-[80%] h-8 rounded-sm px-5 border-b-2 border-gray-600
            placeholder:text-[#78787c]
             focus:bg-[#838485] hover:bg-[#838485] transition-all duration-700 ease-in-out p-2  outline-none
             focus:placeholder:text-[#838485] hover:placeholder:text-[#000000] placeholder:duration-500
             placeholder:transition-colors text-gray-400 text-center hover:text-black focus:text-black
             hover:w-full focus:w-full py-5
            '  />
            }
            
        </div>
        <div className=' flex-1 h-full flex justify-end items-center'>
            <div className=' mr-10 flex gap-3'>

            <Link to='/login'>
                {loginpage ? null : <button className='text-blue-500 '>Login</button> }
                
            </Link>
            <Link to='/singup'>
                {registerpage ? null : <button className='  text-[#cbc5c5]'>Signup</button>}
            </Link>
            
            </div>

        </div>

    </header>
    )
}