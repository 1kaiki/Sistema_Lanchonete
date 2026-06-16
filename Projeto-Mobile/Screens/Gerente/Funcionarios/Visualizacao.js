import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../../Services/FirebaseConfig';

const db = getFirestore(app);

export default function Visualizacao() {

    const [funcionarios, setFuncionarios] = useState([]);

    async function carregarFuncionarios() {

        try {

            const querySnapshot = await getDocs(
                collection(db, "funcionarios")
            );

            let lista = [];

            querySnapshot.forEach((doc) => {

                lista.push({
                    id: doc.id,
                    ...doc.data()
                });

            });

            setFuncionarios(lista);

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

                            <Text variant="titleMedium" style={styles.name}>
                                {item.nome}
                            </Text>

                            <Text style={styles.detail}>
                                Cargo: {item.tipo}
                            </Text>

                            <Text style={styles.detail}>
                                CPF: {item.cpf}
                            </Text>

                            <Text style={styles.detail}>
                                Email: {item.email}
                            </Text>

                            <Text style={styles.detail}>
                                Telefone: {item.telefone}
                            </Text>

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
        backgroundColor: '#191414e1',
        padding: 10,
    },

    card: {
        marginBottom: 10,
        backgroundColor: '#2b2b2b',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
    }

    ,
    name: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 6,
    },
    detail: {
        color: '#dcdcdc',
        marginBottom: 4,
    }

});