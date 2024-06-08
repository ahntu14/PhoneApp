import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
    UPDATE_NAME,
    UPDATE_EMAIL,
    REFRESH_TOKEN,
    ACCESS_TOKEN,
    UPDATE_PHONE,
    UPDATE_ADDRESS,
} from '../../redux/reducers/infoReducer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Vui lòng nhập email và mật khẩu.');
            return;
        } else {
            await axios
                .post('http://10.0.2.2:1406/auth/login', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    dispatch({ type: UPDATE_NAME, payload: res.data.name });
                    dispatch({ type: UPDATE_EMAIL, payload: res.data.email });
                    dispatch({ type: ACCESS_TOKEN, payload: res.data.accessToken });
                    dispatch({ type: REFRESH_TOKEN, payload: res.data.refreshToken });
                    dispatch({ type: UPDATE_PHONE, payload: res.data.phone });
                    dispatch({ type: UPDATE_ADDRESS, payload: res.data.address });
                    setEmail('');
                    setPassword('');
                    navigation.navigate('HomeTabs');
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký ngay!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng Nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerText: {
        color: 'blue',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
