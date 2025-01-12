


import { useParams } from "react-router"
import { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function HomeLeft() {


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


    let params = useParams()

    const [allTopics, setAllTopics] = useState([])


    async function fetchAllDocks() {

        const url = params.query
        console.log()

        try {
            
            const response = await api.get('/api/topics/')

            console.log(response.data.results)
            setAllTopics(response.data.results)
        }
        catch (e) {

        }
    }

    useEffect(()=> {

        fetchAllDocks()

    }, [])





    return (
    <div className=' h-[600px]  rounded-md  w-64 fixed top-[14%] flex-col gap-6 pl-10
    '>
        {allTopics.map((ele, index)=> (

                <Link key={index} to={`/home/?query=${ele.name}`}>
                    <div  className="p-3 font-[550] text-[#cfcfcf] hover:cursor-pointer 
                    hover:bg-[#444444] hover:text-[#fbfbfb]
                        transition-all duration-200 ease-in-out hover:scale-110 text-xl py-4
                    ">{ele.name}</div>
                </Link>
            ))
        }

    </div>
    )
}