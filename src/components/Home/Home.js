import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { userData } from '../../slice/dataUser'
import Swiper from 'react-native-swiper'
import 'react-native-get-random-values'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBed, faBath, faSearch, faSlidersH, faEdit } from '@fortawesome/free-solid-svg-icons'
import { height, width } from '../constants'
import { settingSelectionMenuHomeValue, settingSelectionMenuHomeAction } from '../../slice/configNavogationSlice'
import { socket } from '../../socket'
import { Api } from '../../api'


const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [dataPropertiesAll, setDataPropertiesAll] = useState([])
    const [dataPropertiesMe, setDataPropertiesMe] = useState([])
    const [dataPromoteList, setDataPromoteList] = useState([])
    const { _id } = useSelector(userData)
    const dispatch = useDispatch()
    const settingSelectionMenuHome = useSelector(settingSelectionMenuHomeValue)
    const dataImageShow = () => {
        return dataPromoteList.map((item) => {
            return (
                <TouchableOpacity
                    key={item.id}
                    style={{ alignItems: 'center' }}
                    onPress={() =>
                        navigation.navigate('DetailHome', {
                            type: item.listingType.listingTypeName,
                            price: item.price,
                            size: item.squareFeet,
                            description: item.description,
                            carParking: item.carParking,
                            smingmingPool: item.swimmingPool,
                            telephone: item.telephone,
                            email: item.email,
                            pictureUrl: item.photo[0].url,
                            id: item.id,
                        })
                    }>
                    {item.photo.length !== 0 && <Image source={{ uri: item.photo[0].url }} style={{ width: '90%', height: 200, resizeMode: 'cover' }} />}
                </TouchableOpacity>
            )
        })
    }

    useEffect(() => {
        getDataPropertyMe()
        getDataPropertyAll()
        findAllPromoteList()
        socket.on(`myproperty-userid-${_id}`, (data) => {
            setDataPropertiesMe((e) => [...e, ...data.rows])
        })
        // const unsubscribe = navigation.addListener('focus', () => {
        // })
        // return unsubscribe
    }, [navigation, getDataPropertyMe, getDataPropertyAll, findAllPromoteList])

    const getDataPropertyAll = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: `${Api.getAllProperties}/`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(false)
            setDataPropertiesAll(response.data.rows)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            }
            setLoading(false)
        }
    }

    const findAllPromoteList = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: `${Api.FindAllPromoteList}`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(false)
            setDataPromoteList(response.data.rows)
        } catch (error) {
            if (error.response) {
                if (error.response.data.status === 404) {
                    setDataPromoteList([])
                } else {
                    alert(error.response.data.status)
                }
            }

            setLoading(false)
        }
    }

    const getDataPropertyMe = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: `https://xlan-property-finder.herokuapp.com/api/v1/posts/postedby/${_id}`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(false)
            setDataPropertiesMe(response.data.rows)
        } catch (error) {
            if (error.response) {
                if (error.response.data.status === 404) {
                    setDataPropertiesMe([])
                } else {
                    alert(error.response.data.status)
                }
            }
            setLoading(false)
        }
    }, [_id])

    let ComponentPropertiesAll = <View></View>
    if (dataPropertiesAll.length !== 0) {
        ComponentPropertiesAll = dataPropertiesAll.map((item, index) => (
            <TouchableOpacity
                style={styles.news}
                key={item.id}
                onPress={() =>
                    navigation.navigate('DetailHome', {
                        type: item.listingType.listingTypeName,
                        price: item.price,
                        size: item.squareFeet,
                        description: item.description,
                        carParking: item.carParking,
                        smingmingPool: item.swimmingPool,
                        telephone: item.telephone,
                        email: item.email,
                        pictureUrl: item.photo[0].url,
                        id: item.id,
                    })
                }>
                <View style={{ width: '50%', backgroundColor: 'grey', height: '100%' }}>{item.photo.length !== 0 && <Image source={{ uri: item.photo[0].url }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}</View>
                <View style={{ flexDirection: 'column', width: '50%', marginLeft: 10 }}>
                    <Text>{item.price}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>{item.numBedrooms}</Text>
                            <View style={{ width: 5 }} />
                            <FontAwesomeIcon icon={faBed} />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>{item.numBathrooms}</Text>
                            <View style={{ width: 5 }} />
                            <FontAwesomeIcon icon={faBath} />
                        </View>
                    </View>
                    <Text numberOfLines={4} style={{ width: '100%' }}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        ))
    }

    let ComponentPropertiesMe = <View></View>
    if (dataPropertiesMe) {
        ComponentPropertiesMe = dataPropertiesMe.map((item, index) => (
            <TouchableOpacity
                style={styles.news}
                key={uuidv4()}
                onPress={() =>
                    navigation.navigate('DetailHome', {
                        type: item.listingType.listingTypeName,
                        price: item.price,
                        size: item.squareFeet,
                        description: item.description,
                        carParking: item.carParking,
                        smingmingPool: item.swimmingPool,
                        telephone: item.telephone,
                        email: item.email,
                        pictureUrl: item.photo[0].url,
                        id: item.id,
                    })
                }>
                {/* <View><Text>{JSON.stringify(item.photo)}</Text></View> */}
                <View style={{ width: '50%', backgroundColor: 'grey', height: '100%' }}>{<Image source={{ uri: item.photo[0].url }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}</View>
                <View style={{ flexDirection: 'column', width: '50%', marginLeft: 10 }}>
                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text>{item.price}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProperty')}>
                            <FontAwesomeIcon icon={faEdit} color="tomato" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>{item.numBedrooms}</Text>
                            <View style={{ width: 5 }} />
                            <FontAwesomeIcon icon={faBed} />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>{item.numBathrooms}</Text>
                            <View style={{ width: 5 }} />
                            <FontAwesomeIcon icon={faBath} />
                        </View>
                    </View>
                    <Text numberOfLines={4} style={{ width: '100%' }}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        ))
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.input}>
                <View style={{ width: '90%', position: 'relative', backgroundColor: 'white', paddingLeft: 10 * width, height: height * 35, borderRadius: height * 25, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <FontAwesomeIcon icon={faSearch} />
                    <View style={{ width: 2, backgroundColor: '#e1e5eb', height: '100%', marginLeft: 10 * width }} />
                    <TextInput placeholder="search" />
                    <View style={{ position: 'absolute', right: 20 * width, flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                        <View style={{ width: 2, backgroundColor: '#e1e5eb', height: '100%' }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                            <FontAwesomeIcon icon={faSlidersH} style={{ marginLeft: 20 * width }} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <Swiper activeDotColor="tomato" showsButtons={true} nextButton={<Text></Text>} prevButton={<Text></Text>} autoplay={true} autoplayTimeout={5}>
                    {dataImageShow()}
                </Swiper>
            </View>
            <View style={styles.detail}>
                {settingSelectionMenuHome.selectionHome === 'property-news' ? (
                    <React.Fragment>
                        <View style={{ width: '100%', height: 30 * height, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ width: '50%', backgroundColor: 'white', borderWidth: 1, padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}>
                                <Text style={{ ...styles.text1, fontWeight: 'bold' }}>Property News</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: '50%', padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                                onPress={() => dispatch(settingSelectionMenuHomeAction('my-property'))}>
                                <Text style={{ ...styles.text1, fontWeight: 'bold', color: 'grey' }}>My Property</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ borderTopWidth: 1 }}>{ComponentPropertiesAll}</ScrollView>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <View style={{ width: '100%', height: 30 * height, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={{ width: '50%', padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: 'white' }}
                                onPress={() => dispatch(settingSelectionMenuHomeAction('property-news'))}>
                                <Text style={{ ...styles.text1, fontWeight: 'bold', color: 'grey' }}>Property News</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '50%', padding: 10, alignItems: 'center', borderWidth: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}>
                                <Text style={{ ...styles.text1, fontWeight: 'bold' }}>My Property</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ borderTopWidth: 1 }}>{ComponentPropertiesMe}</ScrollView>
                    </React.Fragment>
                )}
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
    },
    detail: {
        flex: 0.5,
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
export default Home
