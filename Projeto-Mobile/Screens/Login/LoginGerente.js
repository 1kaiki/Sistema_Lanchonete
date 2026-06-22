import React, { useState } from 'react';

import {
    View,
    StyleSheet,
    Image
} from 'react-native';

import {
    TextInput,
    Button,
    Text
} from 'react-native-paper';

export default function LoginGerente({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar() {

        if(
            email === "admin@gmail.com"
            &&
            senha === "123456"
        ) {

            navigation.navigate("GerenteNav");

        }

        else {

            alert("Email ou senha incorretos");
        }

    }

    return(

        <View style={styles.container}>

            <View style={styles.meio}>
                <Image
                    source={require('../../assets/restaurantesemfundo.png')}
                    style={styles.logo}
                />
            </View>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                label="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                style={styles.input}
            />

            <Button
                mode="contained"
                style={styles.button}

                onPress={logar}
            >
                Entrar
            </Button>

            <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate('EscolhaLogin')}
            >
                Voltar
            </Button>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#191414e1',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#fff'
    },

    meio: {
        alignItems: 'center',
        marginBottom: 20,
    },

    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },

    input: {
        width: 250,
        marginBottom: 15,
        backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#208F70',
        borderRadius: 20,
        marginTop: 30,
        width: 250,
    },

});