import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import api from '../api'


import testImage from '../assets/pfp.png'

interface Dock {
  id: number;
  title: string;
  topic: {
    name: string;
  };
  participants: {
    id: number;
    name: string;
  }[];
}

export default function Dock() {
  const params = useParams();
  const roomId = params.id;

  let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not onmasd"

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [dockData, setDockData] = useState<Dock | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  async function fetchDockData() {
    try {

        const response = await api.get(`/api/rooms/${roomId}`)
        console.log(response.data)
      setDockData(response.data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async function fetchMessages() {
    try {
      const initialMessages = [
        {
          id: 1,
          sender: {
            id: 1,
            name: "John Doe",
            username: "john.doe@example.edu",
          },
          body: "Hello everyone! Welcome to the chat room.",
          created_at: "2023-10-01T10:00:00Z",
        },
        {
          id: 2,
          sender: {
            id: 2,
            name: "Jane Smith",
            username: "jane.smith@example.edu",
          },
          body: "Hi John! Glad to be here.",
          created_at: "2023-10-01T10:05:00Z",
        },
      ];
      setMessages(initialMessages);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  useEffect(() => {
    fetchDockData();
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleJoin() {
    setIsJoined(true)
  };

   function handleSendMessage(e) {
    e.preventDefault(); 
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: {
        id: 3,
        name: "Current User",
        username: "user@example.edu",
      },
      body: newMessage,
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#2d2e2f]">
      <Header />

      <div className="flex-1 flex overflow-hidden p-5 mx-52">
        <div className="flex-1 bg-[#454748] rounded-lg mr-4 flex flex-col overflow-hidden">
          <div className="p-4 bg-[#3a3a3a] rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a href="/home" className="text-[#cbc5c5] hover:text-[#acaaaa]">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="24"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </a>
              <h3 className="text-xl font-bold text-[#cbc5c5]">{dockData?.creator?.name}'s Dock</h3>
            </div>
            {!isJoined && (
              <button
                onClick={handleJoin}
                className="bg-[#1a68eedb] text-[#cdc6c6] px-4 py-2 rounded-md hover:bg-[#264881] transition-colors"
              >
                Join Dock
              </button>
            )}
          </div>

            <div className="flex-1 overflow-y-auto p-7 ">
                <div className="mb-4">
                    <div className="flex items-center">
                        {/* <img src={testImage} alt="" className="w-14 rounded-2xl my-2 mr-5" />
                        <h3 className="flex-1 text-2xl font-bold text-[#cbc5c5]">{dockData?.title}</h3>
                        <p className="text-gray-400">2:34 PM, Jan 15th 2024</p> */}
                        <img src={testImage} alt="" className="w-20 rounded-2xl my-2 mr-5" />
                        <div>
                            <h3 className="flex-1 text-2xl font-bold text-[#cbc5c5]">{dockData?.title}</h3>
                            <p className="text-gray-400">{dockData?.creator?.username}</p>
                            <p className="text-gray-400">2:34 PM, Jan 15th 2024</p>

                            {/* <p className="text-gray-400">#Math</p> */}

                        </div>
                    </div>
                    <p className="py-1 text-[#d4d4d4] text-[15px]">{text.length < 650 ? text : text.slice(0,640)} {
                        text.length < 650 ? null : <a className="inline-block text-blue-500 underline ">... expand</a>

                    }</p>
                        
                    <p className="text-[#acaaaa] ">#{dockData?.topic?.name}</p>
                </div>

                <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex flex-col bg-[#535353] p-5">
                        <div className="flex items-center gap-2 ">
                            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                            <div className="flex flex-col">
                            <span className="text-[#cbc5c5] font-semibold">
                                @{message.sender.username}
                            </span>
                            <span className="text-[#979292] text-sm">
                                {new Date(message.created_at).toLocaleTimeString()}
                            </span>
                            </div>
                        </div>
                        <p className="text-[#cbc5c5] mt-1">{message.body}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
                </div>
            </div>

          {isJoined && (
            <form onSubmit={handleSendMessage} className="p-4 bg-[#3a3a3a] rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="flex-1 bg-[#454748] text-[#cbc5c5] p-2 rounded-md focus:outline-none placeholder:text-[#78787c]"
                />
                <button
                  type="submit"
                  className="bg-[#1a68eedb] text-[#cdc6c6] px-4 py-2 rounded-md hover:bg-[#264881] transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="w-1/4 bg-[#454748] rounded-lg p-4 overflow-y-auto">
          <h3 className="text-xl font-bold text-[#cbc5c5] mb-4">
            Participants ({dockData?.participants?.length} Joined)
          </h3>
          <div className="space-y-2">
            {dockData?.participants?.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-[#cbc5c5]">{participant.name}</span>
                  <span className="text-[#979292] text-sm">
                    @{participant.name.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}