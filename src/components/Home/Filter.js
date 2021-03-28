import React, { useState } from 'react'
import { View, Text, SafeAreaView, Dimensions, Switch, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import {  RFValue } from 'react-native-responsive-fontsize'
const Filter = ({ navigation }) => {
    const width = Dimensions.get('window').width / 384
    const height = Dimensions.get('window').height / 781.3333333333334
    const [listingType, setListingType] = useState('all')
    const [propertyType, setPropertyType] = useState('all')
    const [value, setvlue] = useState([1000, 10000])
    const multiSliderValuesChange = (values) => {
        setvlue(values)
    }
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
    const [isEnabled2, setIsEnabled2] = useState(false)
    const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState)
    const STANTDARD = 781
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 10 * width }}>
            <TouchableOpacity style={{ flexDirection: 'row', flex: 0.08, position: 'absolute', left: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faAngleLeft} size={width * 40} />
                <Text style={{ fontSize: RFValue(20, STANTDARD) }}>Back</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 * width, paddingVertical: 6 * height, backgroundColor: '#22223b', margin: 10, borderRadius: 10 * height }}>
                <Text style={{ fontSize: RFValue(30, STANTDARD), color: '#fff', fontWeight: 'bold' }}>Filter</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center', height: 40 * height, marginTop: '5%' }}>
                <Text style={{ textAlignVertical: 'center' }}>Listing Type</Text>
                <DropDownPicker
                    items={[
                        { label: 'All', value: 'all' },
                        { label: 'Sale', value: 'sale' },
                        { label: 'Rent', value: 'rent' },
                    ]}
                    defaultValue={listingType}
                    containerStyle={{ height: height * 50, width: '50%' }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => setListingType(item.value)}
                />
            </View>
            <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center', height: 40 * height, marginTop: '5%' }}>
                <Text>Property Type</Text>
                <DropDownPicker
                    items={[
                        { label: 'All', value: 'all' },
                        { label: 'Condo', value: 'condo' },
                        { label: 'House', value: 'house' },
                        { label: 'Apartment', value: 'apartment' },
                    ]}
                    defaultValue={propertyType}
                    containerStyle={{ height: 40, width: '50%' }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => setPropertyType(item.value)}
                />
            </View>

            <View style={{ flexDirection: 'column', marginTop: '20%' }}>
                <MultiSlider values={[value[0], value[1]]} sliderLength={280} onValuesChange={multiSliderValuesChange} min={200} max={20000} step={1} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>{value[0]}</Text>
                    <Text>{value[1]}</Text>
                </View>
            </View>
            <Text style={{ textAlign: 'left', width: '80%', marginTop: '3%', fontSize: 20 * width, color: 'tomato' }}>Bedrooms</Text>
            <View style={{ width: '85%', height: 60 * height, marginTop: '3%', flexDirection: 'row' }}>
                <View style={{ width: width * 50, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <Text>All</Text>
                </View>
                <View style={{ width: width * 51, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Studio</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>1</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>2</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>3</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>4</Text>
                </View>
                <View style={{ flex: 1, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text>5+</Text>
                </View>
            </View>

            <Text style={{ textAlign: 'left', width: '80%', marginTop: '3%', fontSize: 20 * width, color: 'tomato' }}>Bathroom</Text>
            <View style={{ width: '85%', height: 60 * height, marginTop: '3%', flexDirection: 'row' }}>
                <View style={{ width: width * 50, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <Text>All</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>1</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>2</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>3</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>4</Text>
                </View>
                <View style={{ width: width * 40, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>5</Text>
                </View>
                <View style={{ flex: 1, height: '100%', backgroundColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text>6+</Text>
                </View>
            </View>
            <Text style={{ textAlign: 'left', width: '80%', marginTop: '3%', fontSize: 20 * width, color: 'tomato' }}>Facilities</Text>
            <View style={{ width: '80%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: '1%' }}>
                <Text>Car parking</Text>
                <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
            </View>
            <View style={{ width: '80%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: '2.5%' }}>
                <Text>Smining pool</Text>
                <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch2} value={isEnabled2} />
            </View>
        </SafeAreaView>
    )
}

export default Filter
