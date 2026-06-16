import React, { useState } from 'react';

import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Text
} from 'react-native';

import {
    TextInput,
    Button,
} from 'react-native-paper';

export default function LoginGerente({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar() {

        if (
            email === 'admin@gmail.com' &&
            senha === '123456'
        ) {
            navigation.navigate('GerenteNav');
        } else {
            alert('Email ou senha incorretos');
        }

    }

    return (

        <ScrollView contentContainerStyle={styles.container} bounces={false} overScrollMode="never">
            <View>
                <View style={styles.topo} />

                <View style={styles.meio}>
                    <Image
                        source={require('../../assets/restaurantesemfundo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.baixo}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                        Logar
                    </Button>

                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => navigation.navigate('EscolhaLogin')}
                    >
                        Voltar
                    </Button>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#191414e1',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
    },

    topo: {
        alignItems: 'center',
    },

    meio: {
        alignItems: 'center',
    },

    baixo: {
        alignItems: 'center',
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#ffffffff',
    },

    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },

    input: {
        marginBottom: 5,
        backgroundColor: '#fff',
        width: 250,
    },

    button: {
        width: 250,
        marginTop: 50,
        backgroundColor: '#208F70',
    },

});