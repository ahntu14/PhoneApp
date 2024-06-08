/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from '../../components/Item';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Favorites = () => {
    const navigation = useNavigation();
    const [product, setProduct] = useState([]);
    const [edit, setEdit] = useState(false);
    const userInfo = useSelector((state) => state.userInfo);

    const GetFavorite = async () => {
        const response = await axios.get('http://10.0.2.2:1406/user/favorite', {
            headers: {
                'Content-Type': 'application/json',
                AccessToken: userInfo.accessToken,
            },
        });
        setProduct(response.data);
    };

    const DeleteFavorite = async (productId) => {
        await axios.delete(`http://10.0.2.2:1406/user/favorite/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                AccessToken: userInfo.accessToken,
            },
        });
        await GetFavorite();
    };

    useEffect(() => {
        GetFavorite();
        const unsubscribe = navigation.addListener('blur', () => {
            setEdit(false);
        });

        return unsubscribe;
    }, [product, navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Item item={item} />
            {edit && (
                <TouchableOpacity onPress={() => DeleteFavorite(item?.id)} style={styles.deleteButton}>
                    <Image style={styles.editButton} source={require('../../../images/minus.png')} />
                </TouchableOpacity>
            )}
        </View>
    );

    const handleEdit = () => {
        setEdit(!edit);
    };

    if (product && product.length > 0) {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.editBtn}>{edit ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.favoriteText}>Favorites</Text>
                    </View>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={product}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.list}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={styles.editBtn}>Edit</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.favoriteText}>Favorites</Text>
                    </View>
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image style={styles.heart} source={require('../../../images/heart2.png')} />
                            <Text style={styles.text}>Items added to your favorites are empty</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.button}>
                                <Text style={styles.buttonText}>Shop now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Arial',
        flex: 1,
    },
    editBtn: {
        marginTop: 15,
        marginLeft: 340,
        fontSize: 19,
        fontWeight: '600',
    },
    favoriteText: {
        fontSize: 21,
        color: 'black',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 230,
        marginLeft: 20,
    },
    heart: {
        width: 60,
        height: 60,
        marginBottom: 15,
        marginTop: 170,
    },
    text: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 350,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    flatListContainer: {
        flex: 1,
    },
    list: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    itemContainer: {
        borderColor: '#ddd',
        backgroundColor: '#fff',
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 240,
        right: 25,
        borderRadius: 15,
        padding: 5,
    },
    editButton: {
        width: 25,
        height: 25,
    },
});

export default Favorites;
