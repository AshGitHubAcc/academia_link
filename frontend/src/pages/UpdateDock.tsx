import { useEffect, useState, useRef } from "react"

import api from "../api"
import { useNavigate } from "react-router"
import { useParams } from 'react-router-dom';




export default function UpdateDock() {
  const navigate = useNavigate()
  const params = useParams()


  const [allTopics, setAllTopics] = useState([])
  const componentRef = useRef(null)
  
  const [dockData, setDockData] = useState({})
  const [errorTitle, setErrorTitle] = useState("*")
  const [errorTopic, setErrorTopic] = useState("*")



  
  async function fetchDock() {
    try {
      const response = await api.get(`/api/rooms/${params.id}`)
      setDockData(response.data)

    } catch (error) {
      console.log('ERROR: ', error.response.statusText)
    }
  }


  async function fetchMainTopics() {
    try {
      const response = await api.get("/api/topics/")
      setAllTopics(response.data.results)
    } catch (error) {
      console.log('ERROR: ', error.response.statusText)
    }
  }

  useEffect(() => {
    fetchDock()
    fetchMainTopics()
  }, [])



  function validateInputs() {
    let valid = 0

    if (dockData.title.trim() === "") {
      setErrorTitle("* cannot be empty")
    } else {
      setErrorTitle("valid")
      valid++
    }

    if (dockData.topic === "") {
      setErrorTopic("* must choose")
    } else {
      valid++
      setErrorTopic("valid")
    }

    return valid === 2
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (validateInputs()) {
      try {


        const response = await api.patch(`/api/rooms/${dockData?.id}/`, dockData)
        navigate('/home')

      } catch (error) {
        console.log("ERROR:", error)
      }
    }
  }



  return (

    <form


      ref={componentRef}
      onSubmit={handleSubmit}
      className={`
        fixed
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#686767] w-[30%] min-w-[35rem] z-[100] rounded-md
        h-[540px] dock-creation
      `}
    >
      <div className="flex-1 bg-[#3a3a3a] flex flex-col justify-center items-center p-5 rounded-md rounded-b-none">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-[#c6c6c6] font-bold mb-1"
          >
            Title{" "}
            <p className="text-red-500 inline-block text-[0.8rem]">
              {errorTitle === "valid" ? "" : errorTitle}
            </p>
          </label>
          <textarea
            name="title"
            value={dockData?.title}

            onChange={(e) =>
              setDockData({ ...dockData, title: e.target.value })
            }
            placeholder="..."
            className="
                    flex-grow-0 text-[#bdbcbc] bg-[#252525] p-5 rounded-[4px] outline-none
                    transition-all duration-[700ms] ease-in-out w-[300px] 
                    focus:placeholder:text-[#121212] placeholder:transition-all placeholder:duration-500
                "
          ></textarea>
        </div>

        <div className="flex flex-col mt-5">
          <label
            htmlFor="description"
            className="text-[#c6c6c6] font-bold mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            value={dockData.body}
            onChange={(e) =>
              setDockData({ ...dockData, body: e.target.value })
            }
            placeholder="..."
            className="
                    flex-grow-0 text-[#a1a1a1] p-5 bg-[#252525]
                     rounded-[4px] border-blue-500 focus:border-b-2 outline-none
                    transition-all duration-[700ms] ease-in-out w-[300px] h-[250px]
                    focus:placeholder:text-[#121212] placeholder:transition-all placeholder:duration-500
                "
          ></textarea>
        </div>
      </div>

      <div className="flex-1 bg-[#3a3a3a] flex flex-col justify-center items-center  pb-5">
        <div className="flex flex-col">
          <label
            htmlFor="topic"
            className="text-[#c6c6c6] font-bold mb-1 flex "
          >
            Topic{" "}
            <p className="text-red-500 inline-block text-[0.8rem]">
              {errorTopic === "valid" ? "" : errorTopic}
            </p>{" "}
          </label>
          <div className="flex gap-5">
            <select
              name="topic"
              value={dockData?.topic?.id}

              onChange={(e) => (
                setDockData({...dockData, topic: allTopics.find(topic => topic.id === parseInt(e.target.value)) || dockData.topic
                })
              )}
              className="px-4 py-2 rounded-md outline-none"
            >
              {allTopics.map((ele, index) => (
                <option key={index} value={ele?.id}>
                  {ele?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>  
      <button className=" after:h-0  w-full h-14 rounded-md rounded-t-none ">Update</button>

    </form>
  )
}
