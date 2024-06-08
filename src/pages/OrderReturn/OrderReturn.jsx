import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderReturn = () => {
    const route = useRoute();
    const { result } = route.params;
    const userInfo = useSelector((state) => state.userInfo);

    const createOrder = async () => {
        try {
            if (result === '0') {
                await axios.post(
                    'http://10.0.2.2:1406/user/order',
                    {
                        provider: 'momo',
                        orderInfo: 'Pham Anh Tu - 0565712335 - Tinh Thuy, Hong Minh, Hung Ha, Thai Binh',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            AccessToken: userInfo.accessToken,
                        },
                    },
                );
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    useEffect(() => {
        createOrder();
    }, []);

    const faildHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Thanh toán thất bại</title>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .failure-message {
                    text-align: center;
                    font-size: 20px;
                    color: #D32F2F; /* Red color */
                }
                .crossmark {
                    color: #D32F2F; /* Red color */
                    font-size: 30px; /* Larger crossmark size */
                }
            </style>
        </head>
        <body>
            <div class="failure-message">
                <div class="crossmark">✖</div>
                Thanh toán thất bại
            </div>
        </body>
        </html>
    `;

    const successHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Thanh toán thành công</title>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .success-message {
                    text-align: center;
                    font-size: 20px;
                    color: #4CAF50; /* Green color */
                }
                .checkmark {
                    color: #4CAF50; /* Green color */
                    font-size: 30px; /* Slightly larger checkmark size */
                }
            </style>
        </head>
        <body>
            <div class="success-message">
                <div class="checkmark">✔</div>
                Thanh toán thành công
            </div>
        </body>
        </html>
    `;

    return <WebView originWhitelist={['*']} source={{ html: result === '0' ? successHTML : faildHTML }} />;
};

export default OrderReturn;
