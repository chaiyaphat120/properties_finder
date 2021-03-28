import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import { Api } from '../../api'
import ModalComponent from '../../shearComponents/ModalComponent'
import { height, width } from '../constants'
import { socket } from '../../socket'
const STANTDARD = 781
const Favorites = () => {
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const { _id } = useSelector((state) => state.userDataState)
    const [dataFromApi, setDataFromApi] = useState([])

    const fecthDataFavorite = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: `${Api.getFavorite}${_id}`,
                headers: { 'Content-Type': 'application/json' },
            })
            const { favorites } = response.data.rows[0]
            setDataFromApi(favorites.post)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }, [Api, _id, setLoading])

    const deleteFavorite = async (idPost) => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'delete',
                data: {
                    postedBy: _id,
                },
                url: `${Api.deleteFavorite}${idPost}`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!loaded) {
            fecthDataFavorite()
            socket.on(`myfavorite-userid-${_id}`, (data) => {
                const { favorites } = data.rows[0]
                setDataFromApi(favorites.post)
            })
        }
        return () => setLoaded(true)
    }, [fecthDataFavorite, loaded])
    return (
        <SafeAreaView style={{ flex: 1, padding: width * 20, height: height }}>
            <Text style={{ marginVertical: 10 * height, fontSize: RFValue(30, STANTDARD), fontWeight: 'bold' }}>Favorites</Text>
            <ScrollView>
                <View style={{ flexDirection: 'row', height: '100%' }}>
                    <View style={{ flexDirection: 'column', height: 600 }}>
                        {dataFromApi.map((e, i) => {
                            return (
                                <View key={e.id} style={{ width: width * 150, height: width * 120, backgroundColor: 'red', margin: 5 * width, display: i % 2 == 1 ? 'none' : null, marginTop: i === 1 ? 0 : 40 * height }}>
                                    <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: e.photo[0].url }}>
                                        <TouchableOpacity
                                            onPress={() => deleteFavorite(e.id)}
                                            style={{ position: 'absolute', right: 0, width: 30 * width, height: 30 * width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 999 }}>
                                            <FontAwesomeIcon color="red" icon={faTrash} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    <Text style={{ fontSize: RFValue(10) }}>{e.description}</Text>
                                </View>
                            )
                        })}
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        {dataFromApi.map((e, i) => {
                            return (
                                <View key={e.id} style={{ width: width * 150, height: width * 120, backgroundColor: 'red', margin: 5 * width, display: i % 2 !== 1 ? 'none' : null, marginTop: i === 0 ? 0 : 40 * height }}>
                                    <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: e.photo[0].url }}>
                                        <TouchableOpacity
                                            onPress={() => deleteFavorite(e.id)}
                                            style={{ position: 'absolute', right: 0, width: 30 * width, height: 30 * width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 999 }}>
                                            <FontAwesomeIcon color="red" icon={faTrash} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    <Text style={{ fontSize: RFValue(10) }}>{e.description}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <ModalComponent loading={loading} />
        </SafeAreaView>
    )
}

export default Favorites
