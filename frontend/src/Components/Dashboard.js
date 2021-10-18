import axios from "axios";
import React, { useEffect, useState } from "react";
import IndexOfPosts from "./IndexOfPosts";
import Navs from "./Nav";
import Posts from "./Posts";

const Dashboard = ()=>{
    const [posts , setPosts] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [postsPerPage , setPostsPerPage] = useState(10);
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;

    useEffect(()=>{
        async function datacall(){
            var {data} = await axios.post("http://localhost:1001/recipe/all",{'token':localStorage.getItem('user')})
            setPosts(data.Data);
            console.log(data);
        }
        datacall()
    },[])
    return (
        <div>
            <Navs />
            WELCOME TO Dashboard
            <Posts posts={posts} />
            {/* <IndexOfPosts posts={posts}  /> */}
        </div>
    );
}

export default Dashboard;