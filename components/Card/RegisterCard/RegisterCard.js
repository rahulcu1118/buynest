import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterCard.css';

const RegisterCard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Account created successfully!");
                // optionally redirect to login page
            } else {
                alert(data.error || "Failed to create account");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return ( 
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <div className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="fname__input register__input" />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="lname__input register__input"/>
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="email__input register__input" placeholder='example@gmail.com' />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="password__input register__input" />
                    </div>
                    <div className="register__button__container">
                        <button className="register__button" onClick={handleSubmit}>Create Account</button>
                    </div>
                </div>
                <div className="register__other__actions">
                    <div className="register__login__account">Already have account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
     );
}

export default RegisterCard;
