import React from 'react'

export default function FormInput({label,placeholder,name,id,type,className ,defaultValue}) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input className="col- form-control"  defaultValue={(defaultValue)&&defaultValue} placeholder={placeholder} name={name} id={id} type={type} />
            <small id={'Err_'+name} className="text-danger form-text "></small>
        </div>
    )
}
