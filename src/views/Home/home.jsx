import { useState } from "react"
import { ListCardsContainer } from "../../components/listCardsContainer"
import { SearchBox } from "../../components/searchBox"
import { FilterMenu } from "../../components/filterMenu"
import { Link } from "react-router-dom"
export const Home = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("date")

    return (
        <div className="flex flex-col items-center h-screen w-full">
            <div className="md:w-1/2">
            <div className="flex flex-row justify-between pt-4 pl-4 pr-4 w-full">
                <div className="flex flex-col">
                <h1 className="text-3xl font-bold">YoChambeo</h1>
                </div>
                <div className="flex flex-col justify-between">
                    <Link to="/publish" className="text-white border bg-black px-2 py-2 rounded-2xl font-bold">Publicar</Link>
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
