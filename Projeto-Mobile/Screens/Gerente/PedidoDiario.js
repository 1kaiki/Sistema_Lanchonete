import React, {
    useEffect,
    useState
} from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';

import {
    Card
} from 'react-native-paper';

import {
    collection,
    onSnapshot
} from 'firebase/firestore';

import { db } from '../../Services/FirebaseConfig';

export default function PedidoDiario() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        const unsubscribe = onSnapshot(

            collection(db, "pedidos"),

            (snapshot) => {

                let lista = [];

                snapshot.forEach((doc) => {

                    lista.push({
                        id: doc.id,
                        ...doc.data()
                    });

                });

                lista.sort(
                    (a, b) =>
                        b.criadoEm?.seconds -
                        a.criadoEm?.seconds
                );

                setPedidos(lista);

            }

        );

        return () => unsubscribe();

    }, []);

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Pedidos do Dia
            </Text>

            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

                    <Card style={styles.card}>

                        <Card.Content>

                            <Text style={styles.mesa}>
                                Mesa {item.numeroMesa}
                            </Text>

                            <Text style={styles.cardText}>
                                Pedido: {item.pedido}
                            </Text>

                            <Text style={styles.cardText}>
                                Garçom: {item.nomeGarcom}
                            </Text>

                            <Text style={styles.cardText}>
                                Observações: {item.observacoes || 'Nenhuma'}
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
        padding: 15
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },

    card: {
        marginBottom: 10,
        backgroundColor: '#2a2a2a'
    },

    mesa: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },

    cardText: {
        color: '#dcdcdc'
    }

});