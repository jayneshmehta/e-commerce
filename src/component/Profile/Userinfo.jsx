import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Userinfo({data}) {
    const [userdata, setUserdata] = useState([]);
    useEffect(() => {
        setUserdata(data);
    }, [data])
    
    
    var profile = (userdata.profile == null)?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxpx8l6QoJJO1-jbWEyJikEZblAfQutrYbzwPMZHCNA&s":"http://192.168.101.102/"+userdata.profile;
    var contact = userdata.contactNo;
    return (
        <div className='d-flex'>
            <div>
                <img className='rounded-circle' style={{ width: '70px', height: '70px' }} src={profile} alt="profile pic" />
            </div>
            <div className='ps-2 pt-2'>
                <h6 className='fw-normal text-capitalize fw-bold'>{userdata.name}</h6>
                <p className="mb-0">
                    {"Email: "+userdata.email}
                    {(contact)&& " Phone: "+contact}
                </p>
            </div>
        </div>
    )
}
