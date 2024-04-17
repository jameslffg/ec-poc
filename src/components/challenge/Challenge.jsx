import React, { useState, useEffect, useRef } from 'react';
import { account, createFile, ID } from '../../lib/appwrite';
import './Challenge.css';

const Challenge = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [picture, setPicture] = useState(null);

    const pictureChooser = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setPicture(e.target.files[0]);
        }
    }

    useEffect(() => {
        account.get().then((response) => {
            setCurrentUser(response);
        }, (err) => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            {currentUser && <p>{`${currentUser.name} is logged in.`}</p>}
            <h2>Take Pictures and Share Them</h2>
            <div className="challenge-tags">
                <div className="challenge-tag community">community</div>
                <div className="challenge-tag nature">nature</div>
            </div>
            <p>I will take at least one photograph that is connected with this year's theme of Nature Conservation & Biodiversity (for example an urban park, bee hives, birds, and other animals...) and I will share it.</p>
            <input type="file" id="picture-uploader" onChange={handleFileChange} ref={pictureChooser}/>
            <button onClick={() => {
                if (pictureChooser && pictureChooser.current) {
                    pictureChooser.current.click();
                }
            }}>Choose Picture</button>
            <button onClick={() => {
                if (picture) {
                    createFile(picture, ID).then((response) => {
                        alert("Picture uploaded!");
                    });
                }
            }}>Upload</button>
            {picture && <img className="challenge-picture" src={URL.createObjectURL(picture)}/>}
        </div>
    );
}

export default Challenge;