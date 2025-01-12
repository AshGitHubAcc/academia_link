import DockLayout from './DockLayout'


export default function HomeMiddle() {

    const titles = [
        'Calc 2 test practice',
        'algo midterm study with me',
        'Meet at snells for something',
        'Calc 2 test practice',
        'Studying for Cal 2 Finals at Snells. 5 people only'
    ]
    const body = [
        'Lorem ipsum dolor sit amet consectetu',
        'r adipisicing elit. Voluptas recusandae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente dignissimos eaque eligendi temporibus inciduntae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente dignissimos eaque eligendi temporibus inciduntae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente dignissimos eaque eligendi temporibus inciduntae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente dignissimos eaque eligendi temporibus inciduntae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente dignissimos eaque eligendi temporibus incidunt, natus at aliquam quo accusantium.',
        'r adipisicing elit. Voluptas recusandae unde aperiam aspernatur enim molestiae itaque ducimus id a, sa',
        'r adipisicing elit. Voluptas recusandae unde aperiam aspernatur enim mucimus id a, sa',
        'r adipisicing elit. Voluptas recusandae unde aperiam aspernatur enim molestiae itaque ducimus id a, sapiente quam quo accusantium.',

    ]


    return (
    <div className="h-auto w-[50%] mx-auto ">

        <div className='flex justify-between h-14  mb-5'>
            <div className=' flex items-end'>
                <p className='font-bold text-[#828181] text-md  text-end flex-none'>Total Rooms: 264</p>
            </div>
            <div>
                <button className='flex-none h-10 text-[#bcbcbc]'>Dock +</button>
            </div>
        </div>


        {titles.map((ele, index)=> (

            <DockLayout key={index} title={ele} body={body[index]} />
        ))


        }
        
        

    </div>
    )
}