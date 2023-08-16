import React from 'react'
import loading from './loading.gif';
export default function Loading({ pageName }) {
    return (
        <div className='row justify-content-center ' >
            <img src={loading} style={{ height: '200px', width: '200px' }} alt='loading' ></img>
            <div className='text-center'>{pageName} data loading...</div>
        </div>
    )
}
