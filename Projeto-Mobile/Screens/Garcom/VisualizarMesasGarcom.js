import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function VisualizarMesasGarcom({ navigation }) {

    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });
            setMesas(lista);
        }, (error) => {
            console.log('Erro ao buscar mesas:', error);
        });

        return () => unsubscribe();
    }, []);

    const VisualizarPedido = (mesa) => {
        navigation.navigate('VisualizarPedidos', { mesa });
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <Text style={styles.titulo}>MESAS ATENDIDAS</Text>

                {mesas.map((mesa) => (
                    <View key={mesa.id} style={styles.mesaContainer}>

                        <Text style={styles.mesaNome}>MESA {mesa.numeroMesa}</Text>

                        <View style={styles.mesaRow}>
                            <View style={[styles.mesaCard, mesa.id === mesas[0]?.id && styles.mesaCardSelected]}>
                                <Text style={styles.statusTexto}>
                                    STATUS: {mesa.status || 'Aguardando'}
                                </Text>
                                <TouchableOpacity
                                    style={styles.botaoVisualizar}
                                    onPress={() => VisualizarPedido(mesa)}
                                >
                                    <Text style={styles.botaoVisualizarTexto}>VISUALIZAR PEDIDO</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Coluna direita: indicador chamada garçom + indicador pedido pronto da cozinha */}
                            <View style={styles.colunaIndicadores}>

                                {/* Botão vermelho/verde original - chamada do garçom */}
                                <TouchableOpacity
                                    style={[
                                        styles.botaoChamada,
                                        { backgroundColor: mesa.chamouGarcom ? '#e53935' : '#43a047' }
                                    ]}
                                />

                                {/* NOVO - Indicador de pedido pronto enviado pela cozinha */}
                                <View style={[
                                    styles.botaoPronto,
                                    { backgroundColor: mesa.pedidoPronto ? '#43a047' : '#e53935' }
                                ]}>
                                    <Text style={styles.botaoProntoTexto}>
                                        {mesa.pedidoPronto ? 'PRONTO' : 'COZINHA'}
                                    </Text>
                                </View>

                            </View>
                        </View>

                    </View>
                ))}

                {mesas.length === 0 && (
                    <Text style={styles.semMesas}>Nenhuma mesa cadastrada.</Text>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#f5f542',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#f5f542',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#222',
    },
    mesaContainer: {
        marginBottom: 20,
    },
    mesaNome: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 6,
    },
    mesaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    mesaCard: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        padding: 12,
    },
    mesaCardSelected: {
        borderWidth: 2,
        borderColor: '#1565C0',
    },
    statusTexto: {
        fontSize: 13,
        color: '#333',
        marginBottom: 10,
    },
    botaoVisualizar: {
        backgroundColor: '#222',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
    },
    botaoVisualizarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    colunaIndicadores: {
        gap: 8,
        alignItems: 'center',
    },
    botaoChamada: {
        width: 45,
        height: 45,
        borderRadius: 4,
    },
    botaoPronto: {
        width: 45,
        height: 45,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoProntoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 9,
        textAlign: 'center',
    },
    semMesas: {
        textAlign: 'center',
        color: '#555',
        marginTop: 30,
        fontSize: 15,
    },
});
