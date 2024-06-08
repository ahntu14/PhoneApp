import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Payment = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { state } = route.params;

    function getResultCodeFromURL(url) {
        const queryString = url.split('?')[1];
        if (!queryString) {
            return null;
        }

        const params = queryString.split('&');

        for (let param of params) {
            let pair = param.split('=');
            if (pair[0] === 'resultCode') {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    const handleNavigationStateChange = (navState) => {
        const resultCode = getResultCodeFromURL(navState.url);
        if (resultCode) {
            navigation.navigate('Return', { result: resultCode });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {state ? (
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: state }}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            ) : (
                <View>
                    <Text>Khoong co gi</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Payment;
