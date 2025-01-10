


// import {useState, useRef} from 'react'

// export default function HomeLeft() {
//     const folderRef = useRef(null);
//     const [expandFolder, setExpandFolder] = useState(false)

//     function applyFolderExpand() {

//     }

//     // const topics = [
//     //     'All',
//     //     'General',
//     //     'Math',
//     //     'CS',
//     //     'Algor and Data',
//     //     'Orgo',
//     //     'General',
//     //     'Math',
//     //     'CS',
  
//     // ]


//     return (
//     <div className={` h-[600px] overflow-scroll p-5 rounded-md  bg-[#3e4345] w-64 fixed top-[14%] flex-col gap-5 
        
//     `}>

//         <div 
//             onClick={()=> setExpandFolder(!expandFolder)}
//             ref={folderRef}
//             style={{
//             height: expandFolder 
//             ? `${folderRef.current?.scrollHeight}px` 
//             : '28px'
//         }}
//         className={`
//             overflow-hidden 
//             transition-all 
//             duration-[500ms] 
//             ease-in-out
//             bg-green-400
//         `}
//         >
//             Computer Sice
//             <ul className={`ml-5 scale-y-0 origin-top transition-all duration-300 ease-in-out
//                     ${expandFolder ? 'scale-y-100' :   ''}
//                 `}>


            
//                 <li>
//                     Fundement of CS
//                 </li>
//                 <li>
//                     OOD
//                 </li>
//                 <li>
//                     Algo and data
//                 </li>
//             </ul>
             
//         </div>

//     </div>
//     )
// }




import { useEffect, useState } from 'react'
import api from '../api'

export default function HomeLeft() {

    const mainTopics = [
        "Computer Science",
        "Mathematics",
        "Biology",
        "Physics",
        "Chemistry",
        "Engineering",
        "Medicine",
        "Business",
        "Economics",
        "Psychology",
        "Education",
        "Sociology",
        "Political Science",
        "Law",
        "Environmental Science",
        "Philosophy",
        "History",
        "Art and Design",
        "Communications",
        "Literature",
        "Anthropology",
        "Linguistics",
        "Astronomy",
        "Geology",
        "Theology/Religious Studies"
    ]
    

    // async function fetchAllTopics() {
    //     try {
            
    //         const response = await api.get('/api/topics/')
    //         console.log(response.data)
    //         setTopics(response.data.results)
    //     } catch (error) {
            
    //     }
    // }



    // useEffect(()=>{
    //     fetchAllTopics()
    // }, [])

    return (
    <div className=' h-[600px] overflow-scroll p-5 rounded-md  bg-[#3e4345] w-64 fixed top-[14%] flex-col gap-5 pr-9
    '>

        {mainTopics.map((ele, index)=> (
                <div key={index} className="p-2">{ele}</div>
            ))
        }

    </div>
    )
}