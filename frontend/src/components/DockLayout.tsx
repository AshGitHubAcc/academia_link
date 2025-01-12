
import { useState } from 'react';
import pfp from '../assets/pfp.png'

export default function DockLayout({title, body}) {

    const [isFollowed, setIsFollowed] = useState(false)
    
    


    return (

    <div className="mx-auto h-auto w-full bg-[#454748] rounded-xl flex flex-col p-3 mb-5
    hover:bg-[#525456] hover:cursor-pointer transition-all duration-300 ease-in-out">


        <div className=" h-12 flex justify-between">

            <div className='flex gap-4 justify-center items-center'>
                <img src={pfp} alt="Profile picture" className='h-12 rounded-xl border-2 border-blue-400' />
                <div className='flex flex-col'>
                    <p className='font-bold text-[#cbc5c5]'>Zoey Lang</p>
                    <p className='text-sm text-[#acaaaa]'>@zoeylang</p>
                </div>
                
            </div>
            
            <button
                className={`${
                    isFollowed ? "bg-transparent text-[#2564ebda] !px-2" : "!px-4 text-[#cdc6c6] bg-[#1a68ee89]"
                }  !py-1 rounded-[6px] mb-auto follow-button text-sm hover:bg-[#264881]
                
                
                `}
                onClick={() => setIsFollowed(!isFollowed)}
                >
                {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>



        <div className="flex-col px-1 py-3 text-small text-[#dfd8d8] flex justify-between">
            <p className="text-[20px] font-bold">
                {title}
            </p>
            <p className="pb-1 text-[#cbc5c5]">{body.length > 365 ? body.slice(0, 365) + "..." : body}</p>
            
        </div>

        <div className="px-2 flex flex-col items-start text-[#979292]" >

            <p className="pt-[3px]">
                #Python #C++
            </p>
            <div className="flex justify-between w-full">
                <div className="flex gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold  text-small">4</p>
                        <p className="  text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold  text-small">97.1K</p>
                        <p className=" text-small">Followers</p>
                    </div>
                </div>

                <p className=" text-small">
                    12/9/2025
                </p>

            </div>            
        </div>
    </div>

    )
}