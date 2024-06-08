/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditProfile = () => {
    const userInfo = useSelector((state) => state.userInfo);
    const [name, setName] = useState(userInfo.name || '');
    const [number, setNumber] = useState(`0${userInfo.phone.toString()}` || '');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [ward, setWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        if (userInfo.address) {
            const parts = userInfo.address.split(', ');
            if (parts.length > 2) {
                setProvinceName(parts[0]);
                setDistrictName(parts[1]);
                setWardName(parts[2]);
            }
        }
    }, [userInfo.address]);

    const getProvince = async () => {
        const result = await axios.get('http://10.0.2.2:1406/user/province');
        setProvinces(result.data);
    };

    useEffect(() => {
        getProvince();
    }, []);

    const getDistrict = async () => {
        if (province) {
            const result = await axios.post(`http://10.0.2.2:1406/user/district`, {
                provinceId: parseInt(province),
            });
            setDistricts(result.data);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (province) {
            getDistrict();
        } else {
            setDistricts([]);
        }
    }, [province]);

    const getWard = async () => {
        if (province) {
            const result = await axios.post(`http://10.0.2.2:1406/user/ward`, {
                districtId: parseInt(district),
            });
            setWards(result.data);
        }
    };

    useEffect(() => {
        if (district) {
            getWard();
        } else {
            setWards([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district]);

    const handleSave = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                AccessToken: userInfo.accessToken,
            };
            const address = `${provinceName}, ${districtName}, ${wardName}`;
            const addressCode = `${province}, ${district}, ${ward}`;
            const response = await axios.put(
                'http://10.0.2.2:1406/user/info',
                {
                    name: name,
                    address: address,
                    phone: parseInt(number),
                    addressCode: addressCode,
                },
                { headers },
            );
            if (response.data.status === true) {
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: `${response.data.message}`,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Đã có lỗi xảy ra',
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={handleBack} style={{ marginBottom: 20 }}>
                <Image style={styles.backBtn} source={require('../../../images/arrow.png')} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label}>Tên:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập tên của bạn" />
                <Text style={styles.label}>Số điện thoại:</Text>
                <TextInput
                    style={styles.input}
                    value={number}
                    onChangeText={setNumber}
                    placeholder="Nhập số điện thoại"
                />
                <TouchableOpacity style={styles.textArea} onPress={() => setShowPicker(true)}>
                    <Text>{`Địa chỉ: ${provinceName}, ${districtName}, ${wardName}`}</Text>
                </TouchableOpacity>

                {showPicker && (
                    <View>
                        <Text style={styles.label}>Tỉnh/Thành phố:</Text>
                        <Picker
                            selectedValue={province}
                            onValueChange={(itemValue, itemIndex) => {
                                setProvince(itemValue);
                                const selectedProvince = provinces.find((pro) => pro.ProvinceID === itemValue);
                                setProvinceName(selectedProvince ? selectedProvince.ProvinceName : '');
                            }}
                            style={styles.picker}
                        >
                            {provinces.map((pro) => (
                                <Picker.Item key={pro.ProvinceID} label={pro.ProvinceName} value={pro.ProvinceID} />
                            ))}
                        </Picker>
                        <Text style={styles.label}>Quận/Huyện:</Text>
                        <Picker
                            selectedValue={district}
                            onValueChange={(itemValue, itemIndex) => {
                                setDistrict(itemValue);
                                const selectedDistrict = districts.find((dis) => dis.DistrictID === itemValue);
                                setDistrictName(selectedDistrict ? selectedDistrict.DistrictName : '');
                            }}
                            style={styles.picker}
                        >
                            {districts.map((dis) => (
                                <Picker.Item key={dis.DistrictID} label={dis.DistrictName} value={dis.DistrictID} />
                            ))}
                        </Picker>
                        <Text style={styles.label}>Xã/Phường:</Text>
                        <Picker
                            selectedValue={ward}
                            onValueChange={(itemValue, itemIndex) => {
                                setWard(itemValue);
                                const selectedWard = wards.find((war) => war.WardCode === itemValue);
                                setWardName(selectedWard ? selectedWard.WardName : '');
                            }}
                            style={styles.picker}
                        >
                            {wards.map((war) => (
                                <Picker.Item key={war.WardCode} label={war.WardName} value={war.WardCode} />
                            ))}
                        </Picker>
                    </View>
                )}
                <View
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Lưu lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    textArea: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    button: {
        width: '60%',
        height: 40,
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
    backBtn: {
        width: 22,
        height: 22,
        marginTop: 10,
        marginLeft: 10,
    },
});

export default EditProfile;
