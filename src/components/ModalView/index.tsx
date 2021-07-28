import React, { ReactNode } from 'react';
import { Text, View, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { Background } from '../Background';


import { styles } from './style';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}

export function ModalView({ children, closeModal, ...rest }: Props) { //passou todas props do TouchableOpacity pelo ...rest

    return (
        <Modal
            transparent
            animationType='slide'
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar}/>
                            {children} 
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
  
    )
}