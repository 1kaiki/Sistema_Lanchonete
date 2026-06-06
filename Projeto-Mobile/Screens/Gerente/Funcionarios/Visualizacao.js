import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import {
    Card,
    Text,
    Button
} from 'react-native-paper';

import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';

import app from '../../../Services/FirebaseConfig';

const db = getFirestore(app);

export default function Visualizacao({ navigation }) {

    const [funcionarios, setFuncionarios] = useState([]);

    async function carregarFuncionarios() {

        try {

            const querySnapshot = await getDocs(
                collection(db, "funcionarios")
            );

            let lista = [];

            querySnapshot.forEach((documento) => {

                lista.push({
                    id: documento.id,
                    ...documento.data()
                });

            });

            setFuncionarios(lista);

        } catch(error) {

            console.log(error);

        }

    }

    async function excluirFuncionario(id) {

        try {

            await deleteDoc(
                doc(db, "funcionarios", id)
            );

            alert("Funcionário excluído com sucesso!");

            carregarFuncionarios();

        } catch(error) {

            console.log(error);

        }

    }

    useEffect(() => {

        carregarFuncionarios();

    }, []);

    return (

        <View style={styles.container}>

            <FlatList
                data={funcionarios}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

                    <Card style={styles.card}>

                        <Card.Content>

                            <Text variant="titleMedium">
                                {item.nome}
                            </Text>

                            <Text>
                                Cargo: {item.tipo}
                            </Text>

                            <Text>
                                CPF: {item.cpf}
                            </Text>

                            <Text>
                                Email: {item.email}
                            </Text>

                            <Text>
                                Telefone: {item.telefone}
                            </Text>

                            <View style={styles.areaBotoes}>

                                <Button
                                    mode="contained"
                                    style={styles.botaoEditar}

                                    onPress={() =>
                                        navigation.navigate(
                                            "EditarFuncionario",
                                            {
                                                funcionario: item
                                            }
                                        )
                                    }
                                >
                                    Editar
                                </Button>

                                <Button
                                    mode="contained"
                                    style={styles.botaoExcluir}

                                    onPress={() =>
                                        excluirFuncionario(item.id)
                                    }
                                >
                                    Excluir
                                </Button>

                            </View>

                        </Card.Content>

                    </Card>

                )}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        padding: 10,
    },

    card: {
        marginBottom: 10,
    },

    areaBotoes: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10,
    },

    botaoEditar: {
        flex: 1,
        backgroundColor: '#2196F3',
    },

    botaoExcluir: {
        flex: 1,
        backgroundColor: '#F44336',
    }

});