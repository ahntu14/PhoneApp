import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from '../../components/Item';
import axios from 'axios';

const SearchScreen = () => {
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    const handleKeywordChange = (text) => {
        setKeyword(text);
    };

    const handleSearch = async () => {
        const result = await axios.get(`http://10.0.2.2:1406/public/search?keyword=${keyword}`);
        setProducts(result.data);
    };

    const renderItem = ({ item }) => <Item item={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchArea}>
                <Image style={styles.image} source={require('../../../images/search.png')} />
                <TextInput
                    style={styles.input}
                    placeholder="Search Product"
                    value={keyword}
                    onSubmitEditing={handleSearch}
                    onChangeText={handleKeywordChange}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.button}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.flatListContainer}>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchArea: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    image: {
        width: 22,
        height: 22,
        marginLeft: 10,
        marginRight: 15,
    },
    input: {
        fontSize: 17,
        marginRight: 145,
    },
    button: {
        fontSize: 16,
    },
    flatListContainer: {
        flex: 1,
    },
    list: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
});

export default SearchScreen;
