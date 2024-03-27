/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.touchable}>
                    <Image style={styles.search} source={require('../../../images/search.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    touchable: {
        alignItems: 'flex-end',
    },
    search: {
        marginTop: 20,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
});

export default Search;
