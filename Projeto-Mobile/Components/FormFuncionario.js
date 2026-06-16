import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import {
    TextInput,
    Button,
    Text
} from 'react-native-paper';

import {
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore';

import app from '../Services/FirebaseConfig';

const db = getFirestore(app);

export default function FormFuncionario({ tipo }) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    async function cadastrarFuncionario() {

        try {

            await addDoc(collection(db, "funcionarios"), {

                tipo: tipo,
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone,

            });

            alert("Funcionário cadastrado!");

            setNome('');
            setCpf('');
            setEmail('');
            setTelefone('');

        } catch(error) {

            console.log(error);

        }

    }

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Cadastro de {tipo}
            </Text>

            <TextInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

            <TextInput
                label="CPF"
                value={cpf}
                onChangeText={setCpf}
                style={styles.input}
            />

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                label="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                style={styles.input}
            />

            <Button
                mode="contained"
                style={styles.button}

                onPress={cadastrarFuncionario}
            >
                Cadastrar
            </Button>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#191414e1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffffff',
    },

    input: {
        marginBottom: 5,
        backgroundColor: '#fff',
        width: 250,
    },

    button: {
        backgroundColor: '#208F70',
        borderRadius: 20,
        marginTop: 50,
        width: 250,
    },

});