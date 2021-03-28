import React, { useState } from 'react'
import axios from 'axios'
import { View, Text, Image, SafeAreaView, TouchableOpacity, Modal, ActivityIndicator, Button , } from 'react-native'
import { height, width } from '../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Api } from '../../api'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from '../CustomInput.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STANTDARD = 781
const SignUp = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [loadingSucces, setLoadingSucces] = useState(false)

    const handleSignUp = async (values) => {
        const { email, fullName, password, phoneNumber, username } = values
        setLoading(true)
        try {
            await axios({
                method: 'post',
                data: {
                    username,
                    password,
                    fullname: `${fullName}`,
                    email,
                    tel: `${phoneNumber}`,
                    role: 'user',
                },
                url: `${Api.Register}`,
                headers: { 'Content-Type': 'application/json' },
            })
            await AsyncStorage.setItem('@username', username )
            await AsyncStorage.setItem('@password', password )
            setLoading(false)
            setLoadingSucces(true)
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            setLoading(false)
        }
    }
    const phoneRegExp = /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const signUpValidationSchema = yup.object().shape({
        fullName: yup
            .string()
            .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('Full name is required'),
        email: yup.string().email('Please enter valid email').required('Email is required'),
        username: yup
            .string()
            .min(8, ({ min }) => `Username must be at least ${min} characters`)
            .required('Username is Required'),
        password: yup
            .string()
            .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
            .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
            .matches(/\d/, 'Password must have a number')
            .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Password must have a special character')
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    })

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            extraHeight={200}>
            <Text style={{ fontSize: 25 * height, marginBottom: 20 * height }}>Welcome to</Text>
            <Image source={require('../../picture/logo.png')} style={{ width: width * 100, height: width * 100, resizeMode: 'contain' }} />
            <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                }}>
                {({ values }) => (
                    <>
                        <Field component={CustomInput} name="fullName" placeholder="Full Name" />
                        <Field component={CustomInput} name="email" placeholder="Email" keyboardType="email-address" />
                        <Field component={CustomInput} name="username" placeholder="Username" />
                        <Field component={CustomInput} name="password" placeholder="Password" secureTextEntry />
                        <Field component={CustomInput} name="confirmPassword" placeholder="Re-Password" secureTextEntry />
                        <Field component={CustomInput} name="phoneNumber" placeholder="phone-Number" />
                        <TouchableOpacity
                            onPress={() => handleSignUp(values)}
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
                            <Text style={{ fontSize: RFValue(20, STANTDARD), color: 'white' }}>SignUp</Text>
                        </TouchableOpacity>
                        <Modal visible={loading} transparent={true}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <ActivityIndicator color="green" size="large" />
                            </View>
                        </Modal>
                        <Modal visible={loadingSucces} transparent={true}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <View style={{ width: '40%', height: '20%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: 20 }}>
                                    <Text style={{ color: 'green' }}>SingUp Success</Text>
                                    <FontAwesomeIcon icon={faCheck} color="green" size={RFValue(40, STANTDARD)} />
                                    <Button title="OK" onPress={() => (navigation.goBack(), setLoadingSucces(false))} />
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default SignUp
