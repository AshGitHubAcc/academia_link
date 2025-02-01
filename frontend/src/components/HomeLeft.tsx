
    // const mainTopics = [
    //     "General",
    //     'School Events',
    //     "Computer Science",
    //     "Mathematics",
    //     "Biology",
    //     "Physics",
    //     "Chemistry",
    //     "Engineering",
    //     "Medicine",
    //     "Business",
    //     "Economics",
    //     "Psychology",
    //     "Education",
    //     "Sociology",
    //     "Political Science",
    //     "Law",
    //     "Environmental Science",
    //     "Philosophy",
    //     // "History",
    //     // "Art and Design",
    //     // "Communications",
    //     // "Literature",
    //     // "Anthropology",
    //     // "Linguistics",
    //     // "Astronomy",
    //     // "Geology",
    //     // "Theology/Religious Studies"
    // ]
import { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'



interface Topics {
    name: String
    id: number
}


export default function HomeLeft() {


    const [allTopics, setAllTopics] = useState([])

    async function fetchMainTopics() {
        try {
            const response = await api.get('/api/topics/')
            setAllTopics(response.data.results)
        }
        catch (e) {
            console.log(e.response.statusText)
        }
    }

    useEffect(()=> {
        fetchMainTopics()
    }, [])



    return (
        <div className='h-auto  w-64 flex-col pl-10  mt-16 0'>
            <Link to={`/home`}>
                <div  className="p-3 font-[550] text-[#afaeae] hover:cursor-pointer 
                hover:bg-[#444444] hover:text-[#fbfbfb]
                    transition-all duration-200 ease-in-out hover:scale-110 text-xl py-4
                ">All</div>
            </Link>

            {allTopics.map((ele: Topics, index: number)=> (

                    <Link key={index} to={`/home/?filter_topic_id=${ele.id}`}>
                        <div  className="p-3 font-[550] text-[#949393] hover:cursor-pointer 
                        hover:bg-[#444444] hover:text-[#fbfbfb]
                            transition-all duration-200 ease-in-out hover:scale-110 text-xl py-4
                        ">{ele.name}</div>
                    </Link>
                ))
            }

        </div>
    )
}