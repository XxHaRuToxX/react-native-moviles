import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({navigation}:Props) => {

    const {signUp, errorMessage, removeError} = useContext(AuthContext);

    const {email, password, name , onChange} = useForm({
        name:'',
        email:'',
        password:'',
    })

    useEffect(() => {
        if(errorMessage.length === 0) return;
        Alert.alert(
            'Registro incorrecto', 
            errorMessage,
            [
                {
                    text:'OK',
                    onPress:removeError
                }
            ]
        )
    }, [errorMessage])

    const onRegister=()=>{
        console.log({email, password, name});
        Keyboard.dismiss();
        signUp({
            nombre:name,
            correo:email,
            password,
        })
    }
    return (
        <>
            <KeyboardAvoidingView
                style={{flex:1, backgroundColor:'#5856d6'}}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>
                    {/* Keyboard avoid view */}
                    <WhiteLogo/>
                    <Text
                        style={loginStyles.title}
                    >Registro</Text>
                    <Text
                        style={loginStyles.label}
                    >Nombre:</Text>
                    <TextInput
                        placeholder="Ingrese su nombre"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        // TODO onchange, value
                        onChangeText={(value)=>onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />
                    <Text
                        style={loginStyles.label}
                    >Email:</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        // TODO onchange, value
                        onChangeText={(value)=>onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Text
                        style={loginStyles.label}
                    >Password:</Text>
                    <TextInput
                        placeholder="Ingrese su contraseña"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        // TODO onchange, value
                        onChangeText={(value)=>onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Boton login */}
                    <View style={loginStyles.buttonContainer} >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText} >Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Boton de login para regresar */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>navigation.replace('LoginScreen')}
                        style={loginStyles.buttonReturn}
                    >
                        <Text style={loginStyles.buttonText} >Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}