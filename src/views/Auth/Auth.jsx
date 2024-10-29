import { useState } from 'react'
import { userLogin } from '../../routes/userRoutes';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export const Auth = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })


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
        const { isLogged, token, isAdmin } = await userLogin(userData.email, userData.password);
        if (isLogged) {
           dispatch(login({token, isAdmin}));
            navigate('/admin');
        }

    }


    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <input name='email' onChange={handleChange} className="focus:outline-none border border-gray-300 py-1 px-4 rounded-2xl" type="text" placeholder="Email" />
                <input name='password' onChange={handleChange} className="focus:outline-none border border-gray-300 py-1 px-4 rounded-2xl" type="password" placeholder="Password" />
                <button className="bg-black text-white font-bold py-1 px-4 rounded-xl transition-transform transform active:scale-95" type="submit">Login</button>
                <Link to ='/register' className="text-gray-500">Registrate!</Link>
            </form>
        </div>
    )
}