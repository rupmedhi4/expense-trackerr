import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { TbArrowBigRightLineFilled } from "react-icons/tb";

// Import the CSS file
import './UpdateDetails.css';

export default function UpdateDetails() {
    const token = localStorage.getItem("token");

    const nameRef = useRef();
    const imageRef = useRef();
    const navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        if (nameRef.current.value === "" || imageRef.current.value === "") {
            alert('Enter full details');
        }
console.log(token);

        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idToken: token,
              displayName: nameRef.current.value,
              photoUrl: imageRef.current.value,
              returnSecureToken: true
            })
          });
          
        if (res.ok) {
            alert('Profile updated successfully');
            console.log(res.json());
            nameRef.current.value = "";
            imageRef.current.value = "";
            navigate("/expense");
        } else {
            alert('Something went wrong');
        }
    }

    useEffect(() => {
        const updateAccount = async () => {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCD3T1zGniDm3GD6469cP9cF4nfy-wADwI', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const users = responseData.users;
                    if (users && users.length > 0) {
                        const [{ displayName, photoUrl }] = users;
                        nameRef.current.value = displayName;
                        imageRef.current.value = photoUrl;
                    }
                } else {
                    console.log('Response not okay');
                }
            } catch (error) {
                console.error('Error updating account:', error);
            }
        }

        if (token) {
            updateAccount();
        }
    }, [token]);

    return (
        <div className="update-details-container">
            <div className="update-details-card">
                <h1>Welcome To Expense Tracker!!!</h1>
                <form className="update-details-form" onSubmit={submitHandler}>
                    <div className="input-group">
                        <label htmlFor="name">
                            <FaGithub className="icon" /> Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="photo">
                            <FiGlobe className="icon" /> Profile Photo URL:
                        </label>
                        <input
                            type="text"
                            name="img"
                            ref={imageRef}
                        />
                    </div>

                    <button className="update-details-btn" type="submit">Update</button>
                </form>

                <button
                    className="arrow-btn"
                    onClick={() => navigate("/expense")}
                >
                    <TbArrowBigRightLineFilled />
                </button>
            </div>
        </div>
    );
}
