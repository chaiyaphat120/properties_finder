import React from 'react'
import { View, Text , Dimensions, Image,  TouchableOpacity ,ScrollView ,TextInput} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {  RFValue} from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const STANTDARD = 781;
const width = Dimensions.get('window').width/384
const height = Dimensions.get('window').height/781.3333333333334
const EditProfile = ({navigation}) => {

    const save = () =>{
        navigation.replace("login")
    }

    return (
        <KeyboardAwareScrollView style={{flex:1,padding:20}} extraHeight={200} >
            <View style={{width:"100%",flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack("")}style={{height:height*40,width:"50%",paddingBottom:5*height ,alignItems:'center',justifyContent:'flex-start',flexDirection:'row',marginBottom:20}}>
                    <FontAwesomeIcon icon={faAngleLeft} size={width*40}/>
                    <Text style={{fontSize:width*20}}>Profile</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flex: 1, position: 'relative' }} bounces={false}>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: width * 200, height: width * 200, backgroundColor: 'pink', borderRadius: width * 200 }}>
                        <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: width * 384 }} source={{ uri: userData.picture !== '' ? `${userData.picture}` : 'https://as1.ftcdn.net/jpg/02/59/39/46/500_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg' }} />
                    </View>
                </View>
                <View style={{ height: height * 300, padding: width * 20, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TextInput placeholder="Username" style={{fontSize:RFValue(20,STANTDARD),backgroundColor:'white',width:"80%",borderRadius:10}}/>
                    <TextInput placeholder="Fullname" style={{fontSize:RFValue(20,STANTDARD),backgroundColor:'white',width:"80%",borderRadius:10}}/>
                    <TextInput placeholder="Email" style={{fontSize:RFValue(20,STANTDARD),backgroundColor:'white',width:"80%",borderRadius:10}}/>
                    <TextInput placeholder="Phone" style={{fontSize:RFValue(20,STANTDARD),backgroundColor:'white',width:"80%",borderRadius:10}}/>
                </View>
            </ScrollView>
            <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity
                    style={{
                        height: 45 * height,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2c3949',
                        borderRadius: 100,
                        flexDirection: 'row',
                        width: '80%',
                    }}
                    onPress={save}>
                    <Text style={{fontSize: RFValue(20, STANTDARD), color: 'white'}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EditProfile