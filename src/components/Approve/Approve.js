import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import 'react-native-get-random-values'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBed, faBath, faTrash } from '@fortawesome/free-solid-svg-icons'
const STANTDARD = 781
const width = Dimensions.get('window').width / 384
const height = Dimensions.get('window').height / 781.3333333333334
const Approve = ({ navigation }) => {
    const [mockup_data] = useState([
        {
            id: 1,
            image: 'https://static.posttoday.com/media/content/2018/11/12/D8359A2BC6B14AE981163E677F466165.jpg',
            type: 'condo',
            price: '฿ 2,700,000',
            num_room: 1,
            num_bath: 1,
            desc: 'Set around a lake at the foot of a hill less than 400 meters from the beach in Kamala, this development of stylishcondominiums offers 235 beautifully designed condominium apartments.',
        },
        {
            id: 2,
            image: 'https://www.sansiri.com/uploads/gallery/2018/07/17/650_4a38d314-0065-4cdf-90c8-94096629ecc7.jpg',
            type: 'condo',
            price: '฿ 5,900,00',
            num_room: 2,
            num_bath: 1,
            desc: ' Offer 175 sq.m. A fully furnished condo on a stunning waterfront. Biggest property with direct beach access.',
        },
        {
            id: 3,
            image:
                'https://th1-cdn.pgimgs.com/listing/7974167/UPHO.76563246.R400X300/Blossom-Condo-Sathorn-Charoenrat-%E0%B8%9A%E0%B8%A5%E0%B8%AD%E0%B8%AA%E0%B8%8B%E0%B8%B1%E0%B9%88%E0%B8%A1-%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94-%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3-%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%A3%E0%B8%B2%E0%B8%A9%E0%B8%8E%E0%B8%A3%E0%B9%8C-%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3-Thailand.jpg',
            type: 'Apartment',
            price: '฿ 6,300,000',
            num_room: 3,
            num_bath: 2,
            desc: 'Offer 175 sq.m. A fully furnished condo on a stunning waterfront. Biggest property with direct beach access.',
        },
        {
            id: 4,
            image: 'https://www.origin.co.th/wp-content/uploads/2019/08/DSC3469-1024x683.jpg',
            type: 'Apartment',
            price: '฿ 1,900,000',
            num_room: 2,
            num_bath: 2,
            desc:
                'Allsopp & Allsopp are proud to present this stunning 1 bedroom apartment. Set in the extremely desirable Executive Tower, complete with mall on your doorstep, kids play area and park along with a gym and pool in the building itself. Great location for a family, to meet friends and amazing community feel. Almost penthouse level floor!',
        },
        {
            id: 5,
            image: 'https://static.posttoday.com/media/content/2018/11/12/D8359A2BC6B14AE981163E677F466165.jpg',
            type: 'condo',
            price: '฿ 2,700,000',
            num_room: 1,
            num_bath: 1,
            desc: 'Set around a lake at the foot of a hill less than 400 meters from the beach in Kamala, this development of stylishcondominiums offers 235 beautifully designed condominium apartments.',
        },
    ])

    return (
        <SafeAreaView style={styles.main}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flex: 0.08,
                    position: 'absolute',
                    right: 10,
                    marginTop: 10,
                }}
                onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: width * 18, color: 'grey' }}>Cancel</Text>
            </TouchableOpacity>
            <View
                style={{
                    height: height * 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 * width, color: '#2c3949', fontWeight: 'bold' }}>Approval</Text>
            </View>
            <View style={styles.detail}>
                <Text style={{ ...styles.text1, fontWeight: 'bold' }}>Waiting Approval</Text>
                <ScrollView>
                    {mockup_data.map((item, index) => (
                        <View style={styles.news} key={item.id}>
                            <View style={{ width: '50%', backgroundColor: 'grey', height: '100%' }}>
                                <ImageBackground
                                    source={{
                                        uri: item.image,
                                    }}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        position: 'relative', // because it's parent
                                        top: 2,
                                        left: 2,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            position: 'absolute', // child
                                            bottom: 0, // position where you want
                                            left: 0,
                                            backgroundColor: 'rgba(255,255,255, 0.5)',
                                            width: '100%',
                                            paddingLeft: 5,
                                            paddingBottom: 3,
                                            paddingTop: 3,
                                        }}>
                                        {item.type}
                                    </Text>
                                </ImageBackground>
                            </View>
                            <View style={{ flexDirection: 'column', width: '50%', marginLeft: 10 }}>
                                <View
                                    style={{
                                        width: '90%',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                    }}>
                                    <Text> {item.price}</Text>
                                    <TouchableOpacity onPress={() => alert('delete')}>
                                        <FontAwesomeIcon icon={faTrash} color="red" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                        }}>
                                        <Text> {item.num_room}</Text>
                                        <View style={{ width: 5 }} />
                                        <FontAwesomeIcon icon={faBed} />
                                    </View>
                                    <View style={{ width: 10 }} />
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                        }}>
                                        <Text> {item.num_bath}</Text>
                                        <View style={{ width: 5 }} />
                                        <FontAwesomeIcon icon={faBath} />
                                    </View>
                                </View>
                                <Text numberOfLines={4} style={{ width: '100%' }}>
                                    {item.desc}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        style={{
                            height: 45 * height,
                            backgroundColor: 'red',
                            marginTop: '5%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#2c3949',
                            borderRadius: 10,
                            flexDirection: 'row',
                            width: '100%',
                        }}
                        onPress={() => alert('Approve completed')}>
                        <Text style={{ fontSize: RFValue(20, STANTDARD), color: 'white' }}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 45 * height,
                            backgroundColor: 'grey',
                            marginTop: '5%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            flexDirection: 'row',
                            width: '100%',
                        }}
                        onPress={() => alert('Approve completed')}>
                        <Text style={{ fontSize: RFValue(20, STANTDARD), color: 'white' }}>Approve All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#edf0ee',
    },
    input: {
        flex: 0.2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input2: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        paddingLeft: 20,
        marginTop: 20,
    },
    content: {
        flex: 0.38,
        marginTop: 40,
        // backgroundColor:'red'
    },
    detail: {
        flex: 0.95,
        padding: 20,
        paddingTop: 0,
    },
    text1: {
        color: 'orange',
        fontSize: 20,
        marginBottom: 10,
    },
    news: {
        height: 120,
        width: '100%',
        // backgroundColor:'pink',
        margin: 10,
        marginLeft: 0,
        flexDirection: 'row',
    },
})
export default Approve
