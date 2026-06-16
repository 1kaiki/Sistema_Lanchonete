import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import { Button } from 'react-native-paper';
import { db } from '../../Services/FirebaseConfig';

import {collection,onSnapshot, doc, updateDoc} from 'firebase/firestore';
 
export default function VisualizacaoMesa({ navigation }) {
 
    const [mesas, setMesas] = useState([]);

    useEffect(() => {

    const unsubscribe = onSnapshot(
        collection(db, 'mesas'),
        (querySnapshot) => {

            const lista = [];

            querySnapshot.forEach((docSnap) => {

                lista.push({
                    firebaseId: docSnap.id,
                    ...docSnap.data()
                });

            });

            lista.sort((a, b) => a.id - b.id);

            setMesas(lista);

        },
        (error) => {
            console.log(
                'Erro ao buscar mesas:',
                error
            );
        }
    );

    return () => unsubscribe();

}, []);

    async function concluirPedido(mesa) {

    try {

        await updateDoc(
            doc(db, 'mesas', mesa.firebaseId),
            {
                status: 'livre',
                pedido: '',
                observacoes: '',
                nomeGarcom: '',
                chamouGarcom: false,
                pedidoPronto: false,
                concluidoCozinha: false,
            }
        );

    } catch (error) {

        console.log(
            'Erro ao concluir pedido:',
            error
        );

    }
}
 
    function corStatus(status) {
        if (status === 'livre') return '#32cd32';
        if (status === 'ocupada') return '#ff3b30';
        return '#ffd60a';
    }
 
    return (
        <View style={styles.container}>
 
            <Text style={styles.titulo}>Visualização das Mesas</Text>
 
            <FlatList
                data={mesas}
                numColumns={2}
                keyExtractor={(item) =>
                    item.firebaseId
                }
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
 
                        <View style={styles.cardMesa}>
                            <Text style={styles.txtMesa}>Mesa {item.id}</Text>
                        </View>
 
                        <View style={styles.areaInferior}>
 
                            <View style={styles.statusContainer}>
                                <View
                                    style={[
                                        styles.statusCor,
                                        { backgroundColor: corStatus(item.status) }
                                    ]}
                                />
                                <Text style={styles.txtStatus}>{item.status}</Text>
                            </View>
 
            {item.status === 'livre' ? (
                <Button
                    mode="contained"
                    style={styles.buttonCadastrar}
                    onPress={() => navigation.navigate('MesasStack', {
                    screen: 'CadastrarMesa',
                    params: { mesa: item }
            })}
            >
            Cadastrar
            </Button>
) : (
    <>
        <Button
            mode="contained"
            style={styles.buttonConsultar}
            onPress={() => navigation.navigate('MesasStack', {
                screen: 'VisualizarPedidos',
                params: { mesa: item }
            })}
        >
            Consultar Pedido
        </Button>

        <Button
            mode="contained"
            style={styles.buttonConcluir}
            onPress={() => concluirPedido(item)}
        >
            Concluir Pedido
        </Button>
    </>
)}
 
                        </View>
 
                    </View>
                )}
            />
 
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        padding: 15,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    cardContainer: {
        width: '48%',
        marginBottom: 30,
    },
    cardMesa: {
        height: 160,
        backgroundColor: '#f5f5f5',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtMesa: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    areaInferior: {
        marginTop: 15,
        gap: 15,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statusCor: {
        width: 30,
        height: 30,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000',
    },
    txtStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    buttonCadastrar: {
        backgroundColor: '#1565C0',
        borderRadius: 15,
    },
    buttonConsultar: {
        backgroundColor: '#ee9a2dff',
        borderRadius: 15,
    },
    buttonConcluir: {
    backgroundColor: '#43a047',
    borderRadius: 15,
},
});
 