
import { useState, useEffect } from 'react';
import pfp from '../assets/pfp.png'

import api from '../api'
import { useNavigate } from 'react-router';






export default function DockLayout({dockData, userData, 
    refetchDocksSignal, setRefetchDocksSignal}) {

    const navigate = useNavigate()
    
    const [isFollowed, setIsFollowed] = useState(false)
    
    function formattedData() {

        const date = new Date(dockData?.created_at);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = hours % 12 || 12;
        const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;
        
        return `${formattedHour}:${formattedMinute} ${ampm}, ${date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric'
        })}`;
    }
    
    
    async function handleDockDelete() {

        try {

            const response = await api.delete(`/api/rooms/${dockData?.id}`)
            setRefetchDocksSignal(refetchDocksSignal+1)

        } catch (error) {
            console.log("Error: ", error)
        }
    }





    return (
    <>

 
        <div 
        
        onClick={()=>navigate(`/dock/${dockData.id}`)}
        className="mx-auto h-auto w-full bg-[#454748] rounded-xl flex flex-col p-3 mb-5
        hover:bg-[#525456] hover:cursor-pointer transition-all duration-300 ease-in-out">


            <div className=" h-12 flex justify-between">

                <div className='flex gap-4 justify-center items-center'>
                    <img src={pfp} alt="Profile picture" className='h-12 rounded-xl border-2 border-blue-400' />
                    <div className='flex flex-col'>
                        <p className='font-bold text-[#cbc5c5]'>{dockData?.creator?.name}</p>
                        <p className='text-sm text-[#acaaaa]'>{dockData?.creator?.username.slice(0, dockData?.creator?.username.indexOf("@"))}</p>
                    </div>
                    
                </div>
                
                {

                    userData?.username === dockData?.creator?.username ?
                    
                    <div>
                        <a 
                            href={`/updateDock/${dockData?.id}`}
                            onClick={(e)=>e.stopPropagation()}
                            className={`
                                hover:text-gray-300
                                px-4 !pl-4 text-[#cdc6c6] bg-[#049b3195] hover:bg-[#1c673395]
                                py-1 rounded-[6px] mb-auto follow-button text-sm mr-3
                            
                            
                            `}
                            >
                            Update
                        </a>
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            handleDockDelete();
                        }}
                            className={` 
                                px-4 !pl-4 text-[#cdc6c6] bg-[#ee1a1a89] hover:bg-[#92252589]
                                py-1 rounded-[6px] mb-auto follow-button text-sm
                            
                            
                            `}
                            >
                            Delete
                        </button>

                    </div>
                    :
                    <button
                        className={`${
                            isFollowed ? "bg-transparent text-[#76a0fbda] !px-2" : "!px-4 text-[#cdc6c6] bg-[#1a68eedb]"
                        }  !py-1 rounded-[6px] mb-auto follow-button text-sm hover:bg-[#264881]
                        
                        
                        `}
                        onClick={() => setIsFollowed(!isFollowed)}
                        >
                        {isFollowed ? "Unfollow" : "Follow"}
                    </button>
            


                }
            </div>



            <div className="flex-col px-1 py-3 text-small text-[#dfd8d8] flex justify-between">
                <p className="text-[20px] font-bold">
                    {dockData?.title}
                </p>
                <p className="pb-1 text-[#cbc5c5]">{dockData?.body.length > 365 ? dockData?.body.slice(0, 365) + "..." : dockData?.body}</p>
                
            </div>

            <div className="px-2 flex flex-col items-start text-[#979292]" >

                <p className="pt-[3px]">
                    #{dockData?.topic.name}
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

                        {formattedData()}
                    </p>

                </div>            
            </div>
        </div>
        
    </>

    )
}