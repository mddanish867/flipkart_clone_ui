import React from 'react';
import { IoIosNotifications } from "react-icons/io";
import "./MoreFeature.css";


export default function MoreFeature() {
  return (
    <div className='more'>
      <div className='more__in'></div>
      <div className='more__in'>
      <IoIosNotifications style={{ marginRight: "10px", color: "#2874f0" }}/>
      <p style={{marginTop:"7px"}}>Notification Preferences</p>
      </div>
      <hr/>
      <div className='more__in'>
      <p>Sell on Flipkart </p> 
      </div>
      <hr/>
      <div className='more__in'>
        <p>
            24*7 Customer Care
        </p>
      </div>
      <hr/>
      <div className='more__in'>
      <p>Advertise</p>
      </div>
      
    </div>
  )
}

