import React from 'react';
import '../../styles/components/Input.css';

const InputField = ({ label, type, name, id, value, onChange }) => {
    return (
        <div className="input-group">
            <label className="label" htmlFor={id}>{label}</label>
            <input 
                autoComplete="off" 
                name={name} 
                id={id} 
                className="input" 
                type={type} 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                required 
            />
            <div></div>
        </div>
    );
};

export default InputField;