import React from 'react'

export default function Userinfo({userdata}) {
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
                    {"Email: "+userdata.email+" Phone: "+ contact}     
                </p>
            </div>
        </div>
    )
}
