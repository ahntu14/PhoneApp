/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const Home = () => {
    const currentDate = moment().format('DD/MM/YYYY');
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text1}>Khám phá</Text>
                <Text style={styles.text2}>{currentDate}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text1: {
        marginTop: 20,
        marginLeft: 30,
        fontSize: 22,
        fontWeight: 'bold',
    },
    text2: {
        marginTop: 5,
        marginLeft: 30,
        fontSize: 15,
        // fontWeight: 'bold',
        fontStyle: 'italic',
    },
});

export default Home;
