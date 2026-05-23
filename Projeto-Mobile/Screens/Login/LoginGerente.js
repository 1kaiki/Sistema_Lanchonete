import React, { useState } from 'react';

import {
    View,
    StyleSheet
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

            <Text style={styles.titulo}>
                Login Gerente
            </Text>

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

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        justifyContent: 'center',
        padding: 20,
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#ee9a2dff',
        borderRadius: 20,
        marginTop: 10,
    },

});