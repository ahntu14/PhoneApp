import React from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };

    const { state } = route.params;

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item?.imageUrl }}></Image>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>

                    <Text style={styles.infoText}>Số lượng: {item.quantity}</Text>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View>
                <TouchableOpacity onPress={handleBack} style={{ marginBottom: 20 }}>
                    <Image style={styles.backBtn} source={require('../../../images/arrow.png')} />
                </TouchableOpacity>
                <Text style={styles.text}>Order detail</Text>
                <View>
                    <FlatList
                        data={state}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        contentContainerStyle={styles.list}
                    />
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
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
});

export default OrderDetail;
