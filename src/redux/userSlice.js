import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false, // estado inicial no logueado
        token: null,
        isAdmin: false
    },
    reducers: {

        login: (state, action) => {
            state.isLoggedIn = true // cambia el estado a logueado
            state.token = action.payload.token // guardo el token del usuario
            state.isAdmin = action.payload.isAdmin // guardo el rol
            localStorage.setItem("token", JSON.stringify(action.payload.token)); // guardar en localStorage
            localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
        },
        logout: (state) => {
            state.isLoggedIn = false // cambia el estado a no logueado
            state.token = null // guardo la info del usuario en null
            state.isAdmin = false
            localStorage.removeItem("token"); // eliminar del localStorage
            localStorage.removeItem("isAdmin");

        }

    }
})

export const { login, logout } = userSlice.actions // exportamos las acciones

export default userSlice.reducer