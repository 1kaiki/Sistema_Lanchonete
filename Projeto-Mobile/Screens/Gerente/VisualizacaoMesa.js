import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import { Button } from 'react-native-paper';

export default function VisualizacaoMesa() {

    const [mesas, setMesas] = useState([

        {
            id: 1,
            status: 'livre',
        },

        {
            id: 2,
            status: 'ocupada',
        },

        {
            id: 3,
            status: 'reservada',
        },

        {
            id: 4,
            status: 'livre',
        },

    ]);

    function adicionarMesa() {

        const novaMesa = {

            id: mesas.length + 1,
            status: 'livre',

        };

        setMesas([...mesas, novaMesa]);
    }

    function corStatus(status) {

        if(status === 'livre') {
            return '#32cd32';
        }

        if(status === 'ocupada') {
            return '#ff3b30';
        }

        return '#ffd60a';
    }

    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Visualização das Mesas
            </Text>

            {/* botão adicionar mesa */}
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
                keyExtractor={(item) => item.id.toString()}

                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}

                renderItem={({ item }) => (

                    <View style={styles.cardContainer}>

                        {/* quadrado da mesa */}
                        <View style={styles.cardMesa}>

                            <Text style={styles.txtMesa}>
                                Mesa {item.id}
                            </Text>

                        </View>

                        {/* parte inferior */}
                        <View style={styles.areaInferior}>

                            {/* status */}
                            <View style={styles.statusContainer}>

                                <View
                                    style={[
                                        styles.statusCor,
                                        {
                                            backgroundColor:
                                            corStatus(item.status)
                                        }
                                    ]}
                                />

                                <Text style={styles.txtStatus}>
                                    {item.status}
                                </Text>

                            </View>

                            {/* botão */}
                            <Button
                                mode="contained"
                                style={styles.button}
                            >
                                Consultar Pedido
                            </Button>

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