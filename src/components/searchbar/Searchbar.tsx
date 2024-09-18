import React from 'react'
import { fetchWebApi } from '../../config/spotify'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const navigate = useNavigate()

    async function handleOnSearch(e: React.FormEvent<HTMLInputElement>){
        console.log(e.currentTarget.value)
        navigate("search/"+e.currentTarget.value)
        // const token = window.localStorage.getItem("token") || "";
        // let isError = false
        // await fetchWebApi("v1/search?q=black&type=track,artist,album", "GET", token).then((res) => {
        //     if (res.error) {
        //       window.localStorage.setItem("token", "undefined");
        //       isError = true;
        //     } else {
        //         console.log("search results", res)
        //     }
        //     // console.log("search results", res)

        //   })
    }
  return (
    <div>
        <input type="text" placeholder='search songs, albums and artists' onChange={handleOnSearch} />
    </div>
  )
}

export default Searchbar