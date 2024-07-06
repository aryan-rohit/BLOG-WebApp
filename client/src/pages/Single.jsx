import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify"


const Single = () => {

  const navigate = useNavigate();
  const [post,setPost] = useState({})

  const location = useLocation();
  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext);
  console.log(postId);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(`/posts/${postId}`)
        console.log(res.data);
        setPost(res.data)
      } catch (err) {
        console.log(err);

      }
    };
    fetchData();
  },[postId])

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log("error hai yaha");

    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} />
        <div className="user">
          {post.userImg && <img src={post.userImg} />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {/* show this div is current user is the owner of this post */}
          {currentUser?.username === post.username &&  <div className="edit">
            <Link to={`/write?edit=${postId}`} state={post}>
              <img src={Edit} />
            </Link>
            <img onClick={handleDelete} src={Delete} />
          </div>}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Menu  cat={post.cat}/>
    </div>
  );
};

export default Single;