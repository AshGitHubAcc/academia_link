import { useEffect, useState, useRef } from "react"
import api from "../api"

interface CreateDockProps {
  dockCreationOpened: boolean
  setDockCreationOpened: Dispatch<SetStateAction<boolean>>
  refetchDocksSignal: number
  setRefetchDocksSignal: Dispatch<SetStateAction<number>>
}

export default function CreateDock({ dockCreationOpened, setDockCreationOpened, refetchDocksSignal, setRefetchDocksSignal,}: CreateDockProps) {


  const [style, setStyle] = useState("")
  const [visiable, setVisiable] = useState(false)
  const [allTopics, setAllTopics] = useState([])
  const componentRef = useRef(null)
  const [submited, setSubmitted] = useState(false)

  const [dockData, setDockData] = useState({
    title: "",
    body: "",
    topic: "",
  })

  const [errorTitle, setErrorTitle] = useState("*")
  const [errorTopic, setErrorTopic] = useState("*")

  async function fetchMainTopics() {
    try {
      const response = await api.get("/api/topics/")
      setAllTopics(response.data.results)
    } catch (e) {
      console.log(e.response.statusText)
    }
  }

  useEffect(() => {
    fetchMainTopics()
  }, [dockData])

  useEffect(() => {
    if (dockCreationOpened) {
      setVisiable(true)
      setTimeout(() => {
        setStyle(" opacity-[1] !left-[50%]")
      }, 50)
    } else {
      setStyle("opacity-[0]")
      const timer = setTimeout(() => setVisiable(false), 400)
      return () => clearTimeout(timer)
    }
  }, [dockCreationOpened])

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
        const response = await api.post("/api/rooms/", dockData)
        console.log(response.data)
        setDockCreationOpened(!dockCreationOpened)
        setDockData({
          title: "",
          body: "",
          topic: "",
        })
        setErrorTitle("*")
        setErrorTopic("*")
        setRefetchDocksSignal(refetchDocksSignal + 1)
      } catch (error) {
        console.log("ERROR:", error)
      }
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if ( componentRef.current && !componentRef.current.contains(event.target)) {
        
        setDockCreationOpened(false)
      }
    }

    if (dockCreationOpened) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dockCreationOpened])

  if (!visiable) {
    return null
  }

  return (

    <form


      ref={componentRef}
      onSubmit={handleSubmit}
      className={`
        absolute bg-[#686767] w-[60%] min-w-[35rem] mt-[4.7rem] z-[100] rounded-xl
        origin-center -translate-x-1/2 -translate-y-1/2 top-[23rem] left-[20%] flex 
         h-[500px] dock-creation  ${style}
         `}
    >
      <div className="flex-1 bg-[#3a3a3a] flex flex-col justify-center items-center ">
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
            value={dockData.title}
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

      <div className="flex-1 bg-[#3a3a3a] flex flex-col justify-center items-center ">
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
              onChange={(e) =>
                setDockData({ ...dockData, topic: e.target.value })
              }
              value={dockData.topic}
              className="px-4 py-2 rounded-md outline-none"
            >
              {allTopics.map((ele, index) => (
                <option key={index} value={ele?.name}>
                  {ele?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="rounded-none ">Submit</button>
    </form>
  )
}
