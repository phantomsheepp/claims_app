import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewFiles.css';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';

export default function ViewFiles({ newFile, setNewFile }) {
    const [files, setFiles] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/claim-files/${id}`)
        .then(response => {
            setFiles(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id, newFile]);

    function deleteFile(file) {
        axios.get(`${import.meta.env.VITE_API}/delete-file/${file.id}`)
        .then(response => {
            setNewFile(Math.random());
        }) 
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            
            {files.map((file) => (
                <div key={file.id} className='files'>
                    <div className='file'>
                        <a href={file.location}>{file.name}</a>
                    </div>

                    <div className='time'>
                        <br />
                        <Popup 
                            trigger={<button className='iconButton'><FaTrashAlt size={15}/></button>}
                            position='right center'>
                            <button className='deleteButton' onClick={() => deleteFile(file)}>Confirm Delete</button>
                        </Popup>
                        <span>{file.time} {file.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
