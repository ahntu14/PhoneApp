import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!username || !email || !password) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email không đúng định dạng.');
            return;
        }

        // Gọi API hoặc thực hiện hành động đăng ký tài khoản ở đây
        console.log('Đăng ký với:', username, email, password);

        // Hiển thị thông báo thành công và chuyển hướng sau 3 giây
        setTimeout(() => {
            alert('Đăng ký thành công!');
            navigation.navigate('Login');
        }, 3000);
    };

    const validateEmail = (email) => {
        // Kiểm tra xem email có đúng định dạng hay không
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Đăng Ký Tài Khoản</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng Ký</Text>
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        textDecorationLine: 'underline',
        fontSize: 16,
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RegisterScreen;
