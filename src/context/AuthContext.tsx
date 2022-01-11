import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';

type AuthContextProps={
    errorMessage:string;
    token:string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp:(registerData:RegisterData)=>void;
    signIn:(loginData:LoginData)=>void;
    logOut:()=>void;
    removeError:()=>void;
}

const authInitialState:AuthState={
    status:'checking',
    token:null,
    user:null,
    errorMessage:'',
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any)=>{
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
        /* AsyncStorage.getItem('token')
            .then(token=>{
                console.log({token})
            })
            .catch(err=>{
                console.log({err})
            }) */
    }, [])

    const checkToken=async()=>{
        const token = await AsyncStorage.getItem('token');
        /* no token, no autenticado */
        if(!token) return dispatch({type:'notAuthenticated'});
        /* Hay token */
        const resp=await cafeApi.get('/auth');
        if(resp.status !== 200){
            return dispatch({type:'notAuthenticated'});
        }
        await AsyncStorage.setItem('token', resp.data.token);
        dispatch({
            type:'signUp',
            payload:{
                token:resp.data.token,
                user:resp.data.usuario
            }
        })
    }

    const signIn=async({correo, password}:LoginData)=>{

        try {
            
            const resp=await cafeApi.post<LoginResponse>('/auth/login',{correo, password});
            /* console.log(resp.data) */
            dispatch({
                type:'signUp',
                payload:{
                    token:resp.data.token,
                    user:resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error:any) {
            console.log(error.response.data.msg);
            dispatch({
                type:'addError',
                payload:error.response.data.msg || 'Información incorrecta'
            })
        }

    }
    const signUp=async({correo, password, nombre}:RegisterData)=>{
        try {
            
            const resp=await cafeApi.post<LoginResponse>('/usuarios',{correo, password, nombre});
            /* console.log(resp.data) */
            dispatch({
                type:'signUp',
                payload:{
                    token:resp.data.token,
                    user:resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error:any) {
            console.log(error.response.data.msg);
            dispatch({
                type:'addError',
                payload:error.response.data.errors[0].msg || 'Revise la información'
            })
        }
    }
    const logOut=async()=>{
        await AsyncStorage.removeItem('token');
        dispatch({type:'logout'})
    }
    const removeError=()=>{
        dispatch({
            type:'removeError',
        })
    }
    return(
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}