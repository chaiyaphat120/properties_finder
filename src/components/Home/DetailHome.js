import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faPhone, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Linking } from 'react-native'
import axios from 'axios'
import { userData } from '../../slice/dataUser'
import { useSelector } from 'react-redux'
import { Api } from '../../api'
import ModalComponent from '../../shearComponents/ModalComponent'
const width = Dimensions.get('window').width / 384
const height = Dimensions.get('window').height / 781.3333333333334
const DetailHome = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const { type, price, size, description, carParking, smingmingPool, telephone, email, pictureUrl, id } = route.params
    const userDataState = useSelector(userData)
    const callPhone = () => {
        Linking.openURL(`tel:${telephone}`)
    }
    const callMail = () => {
        Linking.openURL(`mailto:${email}`)
    }
    const LineOpen = () => {
        Linking.openURL('http://line.me/ti/p/~@suthnews')
    }
    const handleFavorite = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'post',
                data: {
                    postedBy: userDataState._id,
                    postId: id,
                },
                url: `${Api.insertFavorite}`,
                headers: { 'Content-Type': 'application/json' },
            })
            navigation.navigate('Favorites')
            setLoading(false) // dispatch(settingSelectionMenuHomeAction('my-property'))
            navigator.replace('Home')
        } catch (error) {
            if (error.response) {
                Alert.alert(JSON.stringify(error.response.data))
            }
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#edf0ee' }}>
            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 * height, alignItems: 'center', marginBottom: 10 * height }} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faAngleLeft} size={width * 40} />
                <Text style={{ fontSize: width * 20 }}>Back</Text>
            </TouchableOpacity>
            <View style={{ height: 250 * height, alignItems: 'center', marginBottom: 20 * height }}>{pictureUrl && <Image source={{ uri: pictureUrl }} style={{ width: '90%', height: '100%', resizeMode: 'cover' }} />}</View>
            <ScrollView>
                <View style={{ width: width - 40, marginLeft: 20, flex: 0.5, marginTop: 10 }}>
                    <Text style={{ fontSize: height * 20, color: 'tomato' }}>Details</Text>
                    <View style={{ width: width - 40 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Type : </Text>
                            <Text>{type && type}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>price : </Text>
                            <Text>{price && `฿ ${price}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Size : </Text>
                            <Text>{size && size}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: height * 20, color: 'tomato', marginTop: height * 15 }}>Description</Text>
                    <Text style={{ width: width * 384 - 20 - 20 }}> {description && description}</Text>
                    <Text style={{ fontSize: height * 20, color: 'tomato', marginTop: height * 15 }}>Facilities</Text>
                    <Text>{carParking ? 'Car packing' : 'No Car packing'}</Text>
                    <Text>{smingmingPool ? 'Swingming pool' : 'Swingming pool'}</Text>
                </View>
            </ScrollView>
            <View style={{ width: '100%', height: 80 * height, backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ width: width * 60, height: width * 60, backgroundColor: 'white', margin: 10, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }} onPress={callPhone}>
                    <FontAwesomeIcon icon={faPhone} size={40 * height} color="#892b64" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: width * 60, height: width * 60, backgroundColor: 'white', margin: 10, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }} onPress={callMail}>
                    <FontAwesomeIcon icon={faEnvelope} size={40 * height} color="#455e89" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite} style={{ width: width * 60, height: width * 60, backgroundColor: 'white', margin: 10, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faHeart} size={40 * height} color="#ef233c" />
                </TouchableOpacity>
            </View>
            <ModalComponent loading={loading}/>
        </SafeAreaView>
    )
}

export default DetailHome
