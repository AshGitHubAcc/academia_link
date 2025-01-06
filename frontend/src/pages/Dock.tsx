
// import { useState } from 'react';
// import { Send, Plus, Smile, Image, AtSign, Hash } from 'lucide-react';

// export default function Dock() {
//   const [message, setMessage] = useState('');
  
//   // Sample data - in real app this would come from props or API
//   const messages = [
//     { id: 1, user: 'Alex Kim', content: "Hey everyone! How's the project going?", time: '2:30 PM', avatar: '/api/placeholder/40/40' },
//     { id: 2, user: 'Sarah Chen', content: 'Making good progress! Just pushed some updates.', time: '2:31 PM', avatar: '/api/placeholder/40/40' },
//     { id: 3, user: 'Mike Johnson', content: "I'll review them soon.", time: '2:35 PM', avatar: '/api/placeholder/40/40' },
//   ];

//   const channels = [
//     { id: 1, name: 'general' },
//     { id: 2, name: 'random' },
//     { id: 3, name: 'project-updates' },
//   ];

//   const onlineUsers = [
//     { id: 1, name: 'Alex Kim', status: 'online' },
//     { id: 2, name: 'Sarah Chen', status: 'online' },
//     { id: 3, name: 'Mike Johnson', status: 'idle' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-800">
//       {/* Left Sidebar - Channels */}
//       <div className="w-64 bg-gray-900 flex flex-col">
//         <div className="p-4 border-b border-gray-700">
//           <h1 className="text-white font-bold text-xl">Team Chat</h1>
//         </div>
//         <div className="p-4">
//           <h2 className="text-gray-400 uppercase text-sm font-semibold mb-2">Channels</h2>
//           {channels.map(channel => (
//             <div key={channel.id} className="flex items-center text-gray-300 hover:bg-gray-700 p-2 rounded cursor-pointer">
//               <Hash size={18} className="mr-2" />
//               {channel.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-gray-800 p-4 border-b border-gray-700">
//           <div className="flex items-center">
//             <Hash size={24} className="text-gray-400 mr-2" />
//             <h2 className="text-white font-semibold">general</h2>
//           </div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-700">
//           {messages.map(msg => (
//             <div key={msg.id} className="flex items-start space-x-3">
//               <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full" />
//               <div>
//                 <div className="flex items-baseline space-x-2">
//                   <span className="font-semibold text-white">{msg.user}</span>
//                   <span className="text-xs text-gray-400">{msg.time}</span>
//                 </div>
//                 <p className="text-gray-200 mt-1">{msg.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="p-4 bg-gray-800">
//           <div className="flex items-center bg-gray-700 rounded-lg p-2">
//             <Plus className="text-gray-400 w-6 h-6 mx-2 cursor-pointer hover:text-gray-200" />
//             <Image className="text-gray-400 w-6 h-6 mx-2 cursor-pointer hover:text-gray-200" />
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none mx-2"
//             />
//             <Smile className="text-gray-400 w-6 h-6 mx-2 cursor-pointer hover:text-gray-200" />
//             <Send className="text-gray-400 w-6 h-6 mx-2 cursor-pointer hover:text-gray-200" />
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar - Online Users */}
//       <div className="w-64 bg-gray-900 p-4">
//         <h2 className="text-gray-400 uppercase text-sm font-semibold mb-4">Online - {onlineUsers.length}</h2>
//         {onlineUsers.map(user => (
//           <div key={user.id} className="flex items-center text-gray-300 mb-3">
//             <div className="relative">
//               <img src="/api/placeholder/32/32" alt={user.name} className="w-8 h-8 rounded-full" />
//               <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 
//                 ${user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
//             </div>
//             <span className="ml-2">{user.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import api from '../api'
import image from '../../public/vite.svg'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'



export default function Dock() {
    const { id } = useParams()
    const [dock, setDock] = useState({})
    const [messages, setMessages] = useState([])
    const [sendingMessage, setSendingMessage] = useState('')

    const [messageSent, setMessageSent] = useState(0)


    async function fetchData() {
        try {
            const response = await api.get(`/api/rooms/${parseInt(id)}/`)

            setDock(response.data)
            setMessages(response.data.messages)
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        fetchData()
    }, [messageSent])


    async function handleMessageSubmit(e) {
        e.preventDefault()

        try {
            const response = await api.post(`/api/messages/`, {
                'body': sendingMessage,
                'room': dock.id,     
            })
            console.log(response)
            setMessageSent(messageSent+1)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const messages123 = [
    { id: 1, user: 'Alex Kim', content: "Hey everyone! How's the project going?", time: '2:30 PM', avatar: '/api/placeholder/40/40' },
    { id: 2, user: 'Sarah Chen', content: 'Making good progress! Just pushed some updates.', time: '2:31 PM', avatar: '/api/placeholder/40/40' },
    { id: 3, user: 'Mike Johnson', content: "I'll review them soon.", time: '2:35 PM', avatar: '/api/placeholder/40/40' },
    ];

    return (

        <div className="h-max-window bg-gray-700 flex">
            <div className="bg-gray-500 h-full flex-1">   
                asd
            </div>

            <div className="bg-gray-600 h-full flex-[3] flex flex-col">
                <div className="flex-[10]">
                {messages.map((ele, index)=> (
                        <div className="flex border p-5 gap-10" key={index}>
                            <div>
                                <img src={image} alt="" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                
                                <div className='underline'>
                                    {ele.creator.username} --- {format(new Date(ele.created_at), 'hh:mm a, MM/dd/yyyy')}
                                
                                </div>

                                <div>
                                    {ele.body}
                                </div>

                                
                                
                                
                            </div>
                        </div>
                    ))}
                </div>


                <form action="" className="bg-gray-700 border flex-1 flex" onSubmit={handleMessageSubmit}>
                    <textarea name="message" value={sendingMessage} onChange={(e)=>setSendingMessage(e.target.value)} className='h-full w-full bg-gray-700' placeholder='Write message...'></textarea>
                    <button>Send</button>

                </form>
                
            </div>

            <div className="bg-gray-500 h-full flex-1">
                asd
            </div>
        </div>
    )
}