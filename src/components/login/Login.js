import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import {useSelector , useDispatch} from 'react-redux'
import { Field, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Api } from '../../api'
import ModalComponent from '../../shearComponents/ModalComponent'
import { fecthDataUserAction } from '../../slice/dataUser'
import { height, width } from '../constants'
import CustomInput from '../CustomInput.js'

const STANTDARD = 781
const login = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSignUp = () => {
        navigation.navigate('signup')
    }

    const handleSignIn = async (values) => {
        setLoading(true)
        const { username, password } = values
        try {
            const response = await axios({
                method: 'post',
                data: {
                    username,
                    password,
                },
                url: `${Api.Login}`,
                headers: { 'Content-Type': 'application/json' },
            })
            setLoading(true)
            dispatch(fecthDataUserAction(response.data))
            navigation.replace('main')
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            }
            setLoading(false)
        }
    }

    const loginValidationSchema = yup.object().shape({
        username: yup
            .string()
            .min(8, ({ min }) => `Username must be at least ${min} characters`)
            .required('Username is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is Required'),
    })

    useEffect(() => {
        async function fetctData() {
            let username = await AsyncStorage.getItem('@username')
            let password = await AsyncStorage.getItem('@password')
            if (!username || !password) return
            setUsername(username)
            setPassword(password)
        }
        fetctData()
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            extraHeight={200}>
            <Formik validationSchema={loginValidationSchema} enableReinitialize initialValues={{ username: username, password: password }} onSubmit={handleSignIn}>
                {({ handleSubmit, isValid, values }) => (
                    <>
                        <Text style={{ fontSize: 25 * height, marginBottom: 20 * height }}>Welcome to</Text>
                        <Image source={require('../../picture/logo.png')} style={{ width: width * 150, height: width * 150, resizeMode: 'contain' }} />
                        <Field component={CustomInput} name="username" placeholder="Username" />
                        <Field component={CustomInput} name="password" placeholder="Password" secureTextEntry />
                        <View style={{ width: 20, height: 20 * height }} />
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={!isValid}
                            style={{
                                width: width * 220,
                                height: 45 * height,
                                backgroundColor: 'red',
                                marginTop: '5%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#2c3949',
                                borderRadius: (65 / 2) * height,
                            }}>
                            <Text style={{ fontSize: RFValue(20, STANTDARD), color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSignUp(values)}
                            style={{
                                width: width * 220,
                                height: 45 * height,
                                backgroundColor: 'red',
                                marginTop: '5%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                borderRadius: (65 / 2) * height,
                            }}>
                            <Text style={{ fontSize: RFValue(20, STANTDARD), color: '#2c3949' }}>SignUp</Text>
                        </TouchableOpacity>
                        <ModalComponent loading={loading} />
                    </>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default login
