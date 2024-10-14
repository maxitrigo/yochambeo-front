import { useState } from "react"
import { ListCardsContainer } from "../../components/listCardsContainer"
import { SearchBox } from "../../components/searchBox"
import { useNavigate } from "react-router-dom"


export const Home = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const navigate = useNavigate()

    const publish = () => {
        localStorage.clear()
        navigate('/publish')
    }

    return (
        <div className="flex flex-col items-center h-screen w-full">
            <div className="w-full md:w-3/4 lg:w-1/2">
            <div className="flex flex-row justify-between pt-4 pl-4 pr-4 w-full">
                <div className="flex flex-col">
                <h1 className="text-3xl font-bold">YoChambeo</h1>
                </div>
                <div className="flex flex-col justify-between">
                    <button onClick={publish} className="text-white border bg-black px-2 py-2 rounded-2xl font-bold">Publicar</button>
                </div>
            </div>
            <div className="sticky top-0 z-10 w-full bg-white">
                <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ListCardsContainer searchTerm={searchTerm} sortBy={sortBy} />
            </div>
        </div>
    )
}
