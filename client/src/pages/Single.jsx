import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
const Single = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img src="https://wallpapercave.com/wp/wp3724325.jpg"/>
        <div className='user'>
        <img src="https://wallpaperaccess.com/full/767048.jpg" alt=""/>
        <div className='info'>
        <span>Aryan</span>
        <p>Posted 2 days ago</p>
        </div>
        <div className="edit">
        <Link to={`write?edit=2`}>
            <img src={Edit} alt="" />
        </Link>    
            <img src={Delete} alt="" />
            
        </div>
        </div>
      </div>
      <Menu/>
    </div>
  )
}

export default Single
