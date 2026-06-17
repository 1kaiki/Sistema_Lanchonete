import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import {
    TextInput,
    Button,
    Text
} from 'react-native-paper';

import {
    getFirestore,
    doc,
    updateDoc
} from 'firebase/firestore';

import app from '../../../Services/FirebaseConfig';

const db = getFirestore(app);

export default function EditarFuncionario({ route, navigation }) {
    
    const { funcionario } = route.params;

    const [nome, setNome] = useState(funcionario.nome);
    const [cpf, setCpf] = useState(funcionario.cpf);
    const [email, setEmail] = useState(funcionario.email);
    const [telefone, setTelefone] = useState(funcionario.telefone);

    async function salvarAlteracoes() {

        try {

            await updateDoc(
                doc(db, "funcionarios", funcionario.id),
                {
                    nome,
                    cpf,
                    email,
                    telefone
                }
            );

            alert("Funcionário atualizado!");
            navigation.goBack();

        } catch(error) {

            console.log(error);

        }
    }

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Editar Funcionário
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
                onPress={salvarAlteracoes}
            >
                Salvar Alterações
            </Button>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        padding: 20,
        justifyContent: 'center'
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    input: {
        marginBottom: 15,
        backgroundColor: '#fff'
    },

    button: {
        backgroundColor: '#ee9a2dff',
        marginTop: 10,
    }

});