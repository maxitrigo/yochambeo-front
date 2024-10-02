import { useEffect, useState } from "react";
import { timeAgo } from "../utils/timeUtils";
import { getAllJobs } from "../routes/jobRoutes";
import { ListCards } from "./listCards";
import { sortJobsByDate, sortJobsBySalary } from "../utils/orderUtils";


export const ListCardsContainer = ({ searchTerm, sortBy }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  

  useEffect(() => {
    loadJobs(page);
  }, [page]);

  const loadJobs = async (page) => {
    try {
      const res = await getAllJobs(page);
      if (res.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prevJobs) => {
          // Concatenamos los nuevos trabajos al inicio de la lista
          const uniqueJobs = [...new Map([...res, ...prevJobs].map(job => [job.id, job])).values()];
          return uniqueJobs;
        });
      }
    } catch (error) {
      console.error("Error al cargar trabajos:", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1 &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const sortJobs = (jobs) => {
    if(sortBy === 'date') {
        return sortJobsByDate(jobs)
    } else if (sortBy === 'salary') {
        return sortJobsBySalary(jobs)
    }
  }

  const sortedJobs = sortJobs(jobs)
  const filteredJobs = sortedJobs.filter((job) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      {filteredJobs.map(({ id, title, company, location, salary, imgUrl, description, requirements, createdAt, email, phone, website }) => (

        <ListCards 
        key={id} 
        title={title} 
        company={company} 
        location={location} 
        salary={salary} 
        createdAt={timeAgo(createdAt)} 
        description={description}
        requirements={requirements}
        email={email}
        phone={phone}
        website={website}
        imgUrl={imgUrl}
        />

      ))}
      {!hasMore && <p className="text-center text-gray-500 pt-4 pb-4">No hay más trabajos para mostrar</p>}
    </div>
  );
};





