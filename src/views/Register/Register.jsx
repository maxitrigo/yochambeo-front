import { userRegister } from "../../routes/userRoutes";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const Register = () => {

    const [userData, setUserData] = useState({ email: '', password: '' })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserData({
            ...userData,
            [name]: value
        })
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await userRegister(userData.email, userData.password);

        if(user.isLogged) {
            dispatch(login(user.isAdmin))
        }
        alert('Usuario registrado exitosamente');
        navigate('/');
    }


    return (
        <div className="flex items-center justify-center h-screen w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
            <input name='email' onChange={handleChange} className="focus:outline-none border border-gray-300 py-1 px-4 rounded-2xl" type="text" placeholder="Email" />
                <input name='password' onChange={handleChange} className="focus:outline-none border border-gray-300 py-1 px-4 rounded-2xl" type="password" placeholder="Password" />
                <button className="bg-black text-white font-bold py-1 px-4 rounded-xl transition-transform transform active:scale-95" type="submit">Registrarse</button>
                <Link to="/auth" className="text-sm text-gray-500">Ya tienes cuenta?</Link>
            </form>
        </div>
    )
}