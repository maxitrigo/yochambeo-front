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
            <div className="flex flex-row justify-start pt-6 pl-6 pr-6 text-purple-700">
                <div className="flex flex-col pb-4">
                <h1 className="text-4xl font-bold mb-2">Bienvenido a YoChambeo</h1>
                <p className="text-lg">Aquí podrás encontrar y publicar trabajos fácilmente.</p>
                </div>
                <div className="flex flex-col justify-between">
                    <Link to="/publish" className="text-white bg-purple-700 px-4 py-2 rounded-md font-bold mt-2 mb-4 ml-4">Publicar</Link>
                    <div className="flex justify-end mb-4 z-20">
                        <FilterMenu className="" setSortBy={setSortBy} />
                    </div>
                </div>
            </div>
            <div className="sticky top-0 z-10 w-full bg-purple-700">
                <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ListCardsContainer searchTerm={searchTerm} sortBy={sortBy} />
        </div>
    )
}
