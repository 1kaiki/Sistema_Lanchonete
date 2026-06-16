import React, { useState, useEffect } from 'react';

import { View,Text,StyleSheet,FlatList } from 'react-native';

import { Button } from 'react-native-paper';

import { db } from '../../Services/FirebaseConfig';

import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function VisualizacaoMesa() {

    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        buscarMesas();
    }, []);

    async function buscarMesas() {

        try {

            const querySnapshot = await getDocs(
                collection(db, 'mesas')
            );

            const listaMesas = [];

            querySnapshot.forEach((doc) => {

                listaMesas.push({
                    firebaseId: doc.id,
                    ...doc.data(),
                });

            });

            listaMesas.sort((a, b) => a.id - b.id);

            setMesas(listaMesas);

        } catch (error) {

            console.log('Erro ao buscar mesas:', error);

        }}

    async function adicionarMesa() {

        try {

            const maiorId =
                mesas.length > 0
                    ? Math.max(...mesas.map(mesa => mesa.id))
                    : 0;

            const novaMesa = {
                id: maiorId + 1,
                status: 'livre',
            };

            await addDoc(
                collection(db, 'mesas'),
                novaMesa
            );

            buscarMesas();

        } catch (error) {

            console.log('Erro ao adicionar mesa:', error);

        }}

    async function excluirMesa(firebaseId) {

        try {

            await deleteDoc(
                doc(db, 'mesas', firebaseId)
            );

            buscarMesas();

        } catch(error) {

            console.log(
                'Erro ao excluir mesa:',
                error
            );
    }}

    function corStatus(status) {

        if (status === 'livre') {
            return '#32cd32';
        }

        if (status === 'ocupada') {
            return '#ff3b30';
        }

        return '#ffd60a';
    }

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Visualização das Mesas
            </Text>

            <Button
                mode="contained"
                style={styles.buttonAdicionar}
                onPress={adicionarMesa}
            >
                Adicionar Mesa
            </Button>

            <FlatList
                data={mesas}
                numColumns={2}
                keyExtractor={(item) =>
                    item.firebaseId || item.id.toString()
                }

                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}

                renderItem={({ item }) => (

                    <View style={styles.cardContainer}>

                        <View style={styles.cardMesa}>

                            <Text style={styles.txtMesa}>
                                Mesa {item.id}
                            </Text>

                        </View>

                        <View style={styles.areaInferior}>

                            <View style={styles.statusContainer}>

                                <View
                                    style={[
                                        styles.statusCor,
                                        {
                                            backgroundColor:
                                                corStatus(item.status),
                                        },
                                    ]}
                                />

                                <Text style={styles.txtStatus}>
                                    {item.status}
                                </Text>

                            </View>

                            <Button
                                mode="contained"
                                style={styles.button}
                            >
                                Consultar Pedido
                            </Button>

                            <Button
                                mode="contained"
                                style={styles.buttonExcluir}
                                onPress={() =>
                                    excluirMesa(item.firebaseId)
                                }
                            >
                                Excluir Mesa
                            </Button>
                        </View>
                    </View>
                )}/>
        </View>  
);}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9b67bff',
        padding: 15,
    },

    buttonExcluir: {
    backgroundColor: '#ff3b30',
    borderRadius: 15,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },

    buttonAdicionar: {
        backgroundColor: '#ee9a2dff',
        marginBottom: 25,
        borderRadius: 15,
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

    button: {
        backgroundColor: '#ee9a2dff',
        borderRadius: 15,
    },

});