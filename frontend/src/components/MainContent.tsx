import HomeLeft from './HomeLeft'
import HomeMiddle from './HomeMiddle'
import HomeRight from './HomeRight'

export default function MainContent() {



    return (
    <div className='flex min-h-[90%] w-full pt-24 '>
        
        <HomeLeft/>
        <HomeMiddle/>
        <HomeRight/>


        
    </div>
    )
}