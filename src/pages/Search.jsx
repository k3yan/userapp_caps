import React,{useEffect,useContext, useState } from "react";
import { UserContext } from "../data/userData";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults";
import SearchCard from "../components/SearchCards";
import {RxHamburgerMenu} from 'react-icons/rx'
import { Tooltip, collapse } from "@material-tailwind/react";
import AdvanceSearch from "../components/AdvanceSearch";
function Search() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [search,setSearchData] = useState("")
  const [searchDatas,setSearchDatas] = useState([])

  const handleSearch = () => {
    console.log("User searched Keyword: ",search)

    setSearchDatas([...searchDatas, "hehe"]); // Update searchDatas with new data
  };
  useEffect(() => {
  if (!currentUser) {
    navigate("/Home");
  }
}, [currentUser,searchDatas])
    if (!currentUser) {
return <Home/>
    }else{
      if(searchDatas.length > 0 ){
        return(
        <div className="absolute top-0  bottom-0 -z-10  h-screen w-full">
            <SearchResults results={searchDatas} inputSearch={search}/>
          </div>
        )
      }else{
        return (
          <div className="absolute top-0  bottom-0 -z-10  h-screen bg-black">
            <img
              src="/static/images/LiceoBG.jpg"
              className="blur-sm object-cover h-screen w-screen"
              alt="background"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                className="sm:w-44 md:w-32 w-44"
                src="/static/images/liceo.png"
                alt="Liceo Logo"
              />
              <label className="flex justify-center">
                <h1 className="text-gray-100 text-lg font-bold sm:text-1xl lg:text-1xl italic mt-8">
                  Hi, {currentUser.displayName}
                </h1>
              </label>
              <div className="flex border-2 rounded w-auto">
                <button
              onClick={handleSearch}
                className="flex items-center justify-center px-4 border-r">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    ></path>
                  </svg>
                </button>
                
                <input
                  type="text"
                  className="px-3 py-2 sm:w-full md:w-60 w-60"
                  placeholder="Search Manuscript..."
                  onChange={(e) => setSearchData(e.target.value)}
                  value={search}
                 
                />
                <AdvanceSearch/>
              </div>
            <button 
            onClick={handleSearch}
            className={`m-2 px-2 py-1 border-2 rounded-lg ${search.length === 0 ? "blur-lg collapse" : "blur-0"} text-white duration-500`}>Search</button>
           
            </div>
            </div>

        );
          }
      
      }
      }
  

export default Search;
