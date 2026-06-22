import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function VisualizarPedidosAtendente({ navigation, route }) {

    const [pedidos, setPedidos] = useState([]);

    const mesaSelecionada = route?.params?.mesa || null;

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

                if (mesaSelecionada) {

                    const mesaFiltrada = lista.filter(
                        mesa => mesa.id === mesaSelecionada.id
                    );

                    setPedidos(mesaFiltrada);

                } else {

                    setPedidos([]);

                }

            },
            (error) => {

                console.log(
                    'Erro ao buscar pedido:',
                    error
                );

            }
        );

        return () => unsubscribe();

    }, []);

    return (

        <ScrollView style={styles.scrollContainer}>

            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botaoVoltarTexto}>
                        ← VOLTAR
                    </Text>
                </TouchableOpacity>

                <Text style={styles.titulo}>
                    PEDIDO DA MESA
                </Text>

                {pedidos.map((mesa) => (

                    <View
                        key={mesa.firebaseId}
                        style={styles.pedidoContainer}
                    >

                        <Text style={styles.labelMesa}>
                            MESA {mesa.id}
                        </Text>

                        <Text style={styles.labelTipo}>
                            PEDIDO:
                        </Text>

                        <View style={styles.caixaInfo}>
                            <Text style={styles.caixaTexto}>
                                {mesa.pedido || 'Sem pedido registrado.'}
                            </Text>
                        </View>

                        {mesa.observacoes ? (
                            <>
                                <Text style={styles.labelTipo}>
                                    OBSERVAÇÕES:
                                </Text>

                                <View style={styles.caixaInfo}>
                                    <Text style={styles.caixaTexto}>
                                        {mesa.observacoes}
                                    </Text>
                                </View>
                            </>
                        ) : null}

                        <View
                            style={[
                                styles.indicador,
                                {
                                    backgroundColor:
                                        mesa.pedidoPronto
                                            ? '#43a047'
                                            : '#e53935'
                                }
                            ]}
                        >
                            <Text style={styles.indicadorTexto}>
                                {
                                    mesa.pedidoPronto
                                        ? 'PEDIDO PRONTO'
                                        : 'EM PREPARO'
                                }
                            </Text>
                        </View>

                    </View>

                ))}

                {pedidos.length === 0 && (

                    <Text style={styles.semPedidos}>
                        Nenhum pedido encontrado.
                    </Text>

                )}

            </View>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    scrollContainer: {
        flex: 1,
        backgroundColor: '#191414e1',
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#191414e1',
    },

    botaoVoltar: {
        alignSelf: 'flex-start',
        backgroundColor: '#208F70',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    botaoVoltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },

    pedidoContainer: {
        marginBottom: 30,
    },

    labelMesa: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },

    labelTipo: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#dcdcdc',
        marginBottom: 5,
        marginTop: 10,
    },

    caixaInfo: {
        backgroundColor: '#2a2a2a',
        borderRadius: 6,
        padding: 12,
        minHeight: 60,
    },

    caixaTexto: {
        fontSize: 13,
        color: '#fff',
    },

    indicador: {
        marginTop: 15,
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },

    indicadorTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },

    semPedidos: {
        textAlign: 'center',
        color: '#dcdcdc',
        marginTop: 30,
        fontSize: 15,
    },

});