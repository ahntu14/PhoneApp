/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../../redux/reducers/infoReducer';

const Profile = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: LOG_OUT });
        navigation.navigate('Login');
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View>
                <View>
                    <TouchableOpacity onPress={handleBack}>
                        <Image style={styles.backBtn} source={require('../../../images/arrow.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textProfile}>Profile</Text>
                </View>
                <View style={styles.avatarBox}>
                    <Image style={styles.avatar} source={require('../../../images/profile.jpg')} />
                </View>
                <View>
                    <Text style={styles.name}>Name</Text>
                </View>
                <View style={styles.editBox}>
                    <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={styles.editBtn}>Edit profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.group}>
                    <View>
                        <TouchableOpacity style={styles.smallGroup} onPress={() => navigation.navigate('Orders')}>
                            <Image style={styles.image} source={require('../../../images/order.png')} />
                            <Text style={styles.groupText}>Orders</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <TouchableOpacity style={styles.notiGroup}>
                            <Image style={{ width: 27, height: 27 }} source={require('../../../images/noti.png')} />
                            <Text style={styles.groupText}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <TouchableOpacity style={styles.smallGroup} onPress={handleLogout}>
                            <Image style={{ width: 23, height: 23 }} source={require('../../../images/logout.png')} />
                            <Text style={styles.groupText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backBtn: {
        width: 22,
        height: 22,
        marginTop: 10,
        marginLeft: 10,
    },
    textProfile: {
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
        marginTop: 10,
    },
    avatarBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    name: {
        textAlign: 'center',
        marginTop: 20,
        textTransform: 'uppercase',
        fontSize: 17,
        color: 'black',
    },
    editBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    btnEdit: {
        width: 150,
        height: 30,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    editBtn: {
        textAlign: 'center',
        marginTop: 3,
        color: 'black',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    image: {
        width: 30,
        height: 30,
    },
    smallGroup: {
        marginRight: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginLeft: 30,
    },
    notiGroup: {
        marginRight: 26,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginLeft: 24,
    },
    groupText: {
        color: 'black',
        marginTop: 5,
    },
    divider: {
        width: 1,
        height: '70%',
        backgroundColor: 'gray',
    },
});

export default Profile;
