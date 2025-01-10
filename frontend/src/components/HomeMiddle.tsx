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
    <div className="flex-[5] py-4 px-10">

        {titles.map((ele, index)=> (

            <DockLayout title={ele} body={body[index]} />
        ))


        }
        
        

    </div>
    )
}