//o Kaiki, separei a sua tela q estava fazendo no arquivo chamado KAIKI.js,
//essa e so pra poder testar certinho, depois vc passa pra ca dnv.



import React, { useState } from 'react';

import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import { Button } from 'react-native-paper';

export default function CadastroMesasGarcom({ navigation }) {

    const [numMesa, setNumMesa] = useState('');
    const [pedido, setPedido] = useState('');
    const [observacoes, setObservacoes] = useState('');

    function enviarDados() {

        navigation.navigate('TelaCozinha', {

            numMesa: numMesa,
            pedido: pedido,
            observacoes: observacoes

        });

    }

    return(

        <View style={styles.container}>

            <View style={styles.Images}>

                <Image
                    style={styles.imagem}
                    source={require('../../assets/restaurante.jpeg')}
                />

            </View>

            <View>

                <Text style={styles.textEdit}>
                    CADASTRE UMA NOVA MESA
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Nº Mesa'
                    value={numMesa}
                    onChangeText={setNumMesa}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Pedido'
                    value={pedido}
                    onChangeText={setPedido}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Observações'
                    value={observacoes}
                    onChangeText={setObservacoes}
                />

                <View style={styles.buttonEdit}>

                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={enviarDados}
                    >
                        Enviar Pedido
                    </Button>

                </View>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        width: 260,
        height: 45,
        backgroundColor: '#D9D9D9',
        marginBottom: 18,
        paddingLeft: 10,
        fontSize: 12,
        borderRadius: 10,
    },

    buttonEdit: {
        marginTop: 10,
        alignItems: 'center'
    },

    textEdit: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold'
    },

    Images: {
        marginBottom: 20
    },

    imagem: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },

    button: {
        backgroundColor: '#ee9a2dff',
        width: 200,
    }

});