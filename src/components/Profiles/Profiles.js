import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { View, Text, Dimensions, Image, ActivityIndicator, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { Api } from '../../api'
import { userData } from '../../slice/dataUser'
import { Button } from 'react-native'
const width = Dimensions.get('window').width / 384
const height = Dimensions.get('window').height / 781.3333333333334
const Profile = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const userDataState = useSelector(userData)
    const [dataUser, setDataUser] = useState('')
    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPhone, setEditPhone] = useState(false)

    const [nameEdit, setNameEdit] = useState('')
    const [emailEdit, setEmail] = useState('')
    const [phoneEdit, setPhone] = useState('')
    useEffect(() => {
        let waiting = true
        if (waiting) getDataUser()
        return () => (waiting = false)
    }, [])

    const getDataUser = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: `${Api.GetDataUser}/${userDataState._id}`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(false)
            setDataUser(response.data)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    const logout = () => {
        navigation.replace('login')
    }
    const handleEditName = () => {
        setEditName(!editName)
    }

    const handleEditEmail = () => {
        console.log(nameEdit)
        setEditEmail(!editEmail)
    }

    const handleEditPhone = () => {
        console.log(nameEdit)
        setEditPhone(!editPhone)
    }

    const handleEdit = async () => {
        console.log({ nameEdit, phoneEdit, emailEdit })
        try {
            const response = await axios({
                method: 'put',
                data: {
                    fullname: nameEdit,
                    email: emailEdit,
                    tel: phoneEdit,
                },
                url: `${Api.updateUser}${userDataState._id}`,
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    let fullname = <Text></Text>
    if (dataUser.fullname) {
        fullname = (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    {editName ? <TextInput style={{ marginRight: 10, color: 'red' }} onChangeText={(e) => setNameEdit(e)} value={nameEdit}></TextInput> : <Text style={{ marginRight: 10 }}>{dataUser.fullname}</Text>}
                </View>
                <TouchableOpacity onPress={handleEditName}>{editName ? <FontAwesomeIcon icon={faCheck} size={20 * height} color="grey" /> : <FontAwesomeIcon icon={faEdit} size={20 * height} color="grey" />}</TouchableOpacity>
            </View>
        )
    }

    let email = <Text></Text>
    if (dataUser.email) {
        email = (
            <View style={{ flexDirection: 'row' }}>
                {editEmail ? <TextInput style={{ marginRight: 10, color: 'red' }} onChangeText={(e) => setEmail(e)} value={emailEdit}></TextInput> : <Text style={{ marginRight: 10 }}>{dataUser.email}</Text>}
                <TouchableOpacity onPress={handleEditEmail}>{editEmail ? <FontAwesomeIcon icon={faCheck} size={20 * height} color="grey" /> : <FontAwesomeIcon icon={faEdit} size={20 * height} color="grey" />}</TouchableOpacity>
            </View>
        )
    }

    let phoneNumber = <Text></Text>
    if (dataUser.tel) {
        phoneNumber = (
            <View style={{ flexDirection: 'row' }}>
                {editPhone ? <TextInput style={{ marginRight: 10, color: 'red' }} onChangeText={(e) => setPhone(e)} value={phoneEdit}></TextInput> : <Text style={{ marginRight: 10 }}>{dataUser.tel}</Text>}
                <TouchableOpacity onPress={handleEditPhone}>{editPhone ? <FontAwesomeIcon icon={faCheck} size={20 * height} color="grey" /> : <FontAwesomeIcon icon={faEdit} size={20 * height} color="grey" />}</TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1, padding: 20 }} extraHeight={200}>
            <ScrollView contentContainerStyle={{ flex: 1, position: 'relative' }} bounces={false}>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: width * 200, height: width * 200, backgroundColor: 'pink', borderRadius: width * 200 }}>
                        <Image
                            style={{ flex: 1, resizeMode: 'cover', borderRadius: width * 384 }}
                            source={{ uri: userData.picture !== '' ? `${userData.picture}` : 'https://as1.ftcdn.net/jpg/02/59/39/46/500_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg' }}
                        />
                    </View>
                </View>
                <View style={{ height: height * 250, padding: width * 20, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {fullname}
                    {email}
                    {phoneNumber}
                </View>
            </ScrollView>
            <Button title="บันทึกการแก้ไข" onPress={handleEdit} />
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '15%', backgroundColor: 'white', width: '50%', borderRadius: 20 }} onPress={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={60 * height} color="grey" />
                    <View style={{ width: 20 }} />
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={loading} transparent={true}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color="green" size="large" />
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    )
}

export default Profile
