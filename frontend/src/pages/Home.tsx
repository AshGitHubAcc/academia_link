
import { useEffect, useState } from 'react'

import Header from "../components/Header"
import HomeLeft from '../components/HomeLeft'
import HomeMiddle from '../components/HomeMiddle'
import HomeRight from '../components/HomeRight'

import CreateDock from '../components/CreateDock'

export default function Home() {


    const [dockCreationOpened, setDockCreationOpened] = useState(false);
    const [refetchDocksSignal, setRefetchDocksSignal] = useState(0);
    const [dockUpdateOpened, setDockUpdateOpened] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));


    useEffect(() => {

        dockCreationOpened ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [dockCreationOpened, dockUpdateOpened])









    


    return (
        <div className="w-full h-auto bg-[#3a3a3ab9]  ">

            <Header />
                
            

            <div className="flex min-h-[90%] w-full pt-24 justify-between ">
                <HomeLeft />

                <HomeMiddle
                    dockCreationOpened={dockCreationOpened}
                    setDockCreationOpened={setDockCreationOpened}

                    dockUpdateOpened={dockUpdateOpened}
                    setDockUpdateOpened={setDockUpdateOpened}

                    refetchDocksSignal={refetchDocksSignal}
                    setRefetchDocksSignal={setRefetchDocksSignal}
                    userData={userData}
                />

                <HomeRight />
            </div>


            <CreateDock
                dockCreationOpened={dockCreationOpened}
                setDockCreationOpened={setDockCreationOpened}
                refetchDocksSignal={refetchDocksSignal}
                setRefetchDocksSignal={setRefetchDocksSignal}
            />
        </div>
    );
}
