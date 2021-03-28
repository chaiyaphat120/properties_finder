import React from 'react'
import { View, Modal ,ActivityIndicator } from 'react-native'

const ModalComponent = ({loading}) => {
    return (
        <Modal visible={loading} transparent={true}>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}>
                <ActivityIndicator color="green" size="large" />
            </View>
        </Modal>
    )
}

export default ModalComponent
