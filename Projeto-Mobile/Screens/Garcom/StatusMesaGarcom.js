import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function StatusMesaGarcom({ navigation }) {

    const [mesas, setMesas] = useState([]);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [pedidosMesa, setPedidosMesa] = useState(null);

    useEffect(() => {
        // Busca em tempo real todas as mesas cadastradas pelo gerente
        const unsubscribe = onSnapshot(collection(db, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ firebaseId: doc.id, ...doc.data() });
            });
            lista.sort((a, b) => (a.id || 0) - (b.id || 0));
            setMesas(lista);

            // Atualiza os dados da mesa selecionada se ela ainda existir
            if (mesaSelecionada) {
                const atualizada = lista.find(m => m.firebaseId === mesaSelecionada.firebaseId);
                if (atualizada) {
                    setPedidosMesa(atualizada);
                }
            }
        }, (error) => {
            console.log('Erro ao buscar mesas:', error);
        });

        return () => unsubscribe();
    }, [mesaSelecionada]);

    function corStatus(status) {
        if (status === 'livre' || !status) return '#32cd32';
        if (status === 'ocupada') return '#ff3b30';
        return '#ffd60a';
    }

    function ConsultarPedido(mesa) {
        if (!mesa.pedido) {
            Alert.alert('Mesa Livre', `A Mesa ${mesa.id} não possui pedido registrado.`);
            return;
        }
        setMesaSelecionada(mesa);
        setPedidosMesa(mesa);
    }

    function fecharConsulta() {
        setMesaSelecionada(null);
        setPedidosMesa(null);
    }

    // Modal de consulta de pedido
    if (pedidosMesa) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>MESA {pedidosMesa.id}</Text>

                <View style={styles.modalCard}>
                    <Text style={styles.modalLabel}>STATUS:</Text>
                    <Text style={[styles.modalValor, { color: corStatus(pedidosMesa.status) }]}>
                        {(pedidosMesa.status || 'livre').toUpperCase()}
                    </Text>

                    <Text style={styles.modalLabel}>PEDIDO:</Text>
                    <View style={styles.caixaInfo}>
                        <Text style={styles.caixaTexto}>{pedidosMesa.pedido || '-'}</Text>
                    </View>

                    {pedidosMesa.observacoes ? (
                        <>
                            <Text style={styles.modalLabel}>OBSERVAÇÕES:</Text>
                            <View style={styles.caixaInfo}>
                                <Text style={[styles.caixaTexto, { fontStyle: 'italic' }]}>
                                    {pedidosMesa.observacoes}
                                </Text>
                            </View>
                        </>
                    ) : null}

                    <Text style={styles.modalLabel}>STATUS COZINHA:</Text>
                    <View style={[styles.caixaInfo, {
                        backgroundColor: pedidosMesa.pedidoPronto ? '#c8f5c8' : '#ffd9d9'
                    }]}>
                        <Text style={[styles.caixaTexto, {
                            color: pedidosMesa.pedidoPronto ? '#2e7d32' : '#c62828',
                            fontWeight: 'bold'
                        }]}>
                            {pedidosMesa.pedidoPronto ? '✅ PEDIDO PRONTO' : '⏳ Aguardando cozinha...'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.botaoVoltar} onPress={fecharConsulta}>
                    <Text style={styles.botaoVoltarTexto}>← VOLTAR</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Visualização das Mesas</Text>

            <FlatList
                data={mesas}
                numColumns={2}
                keyExtractor={(item) => item.firebaseId || item.id?.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={
                    <Text style={styles.semMesas}>
                        Nenhuma mesa cadastrada.{'\n'}O gerente deve adicionar mesas primeiro.
                    </Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>

                        <View style={styles.cardMesa}>
                            <Text style={styles.txtMesa}>Mesa {item.id}</Text>
                        </View>

                        <View style={styles.areaInferior}>

                            <View style={styles.statusContainer}>
                                <View style={[
                                    styles.statusCor,
                                    { backgroundColor: corStatus(item.status) }
                                ]} />
                                <Text style={styles.txtStatus}>
                                    {item.status || 'livre'}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => ConsultarPedido(item)}
                            >
                                <Text style={styles.buttonTexto}>Consultar Pedido</Text>
                            </TouchableOpacity>

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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    cardContainer: {
        width: '48%',
        marginBottom: 25,
    },
    cardMesa: {
        height: 130,
        backgroundColor: '#f5f5f5',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtMesa: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    areaInferior: {
        marginTop: 12,
        gap: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statusCor: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000',
    },
    txtStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    button: {
        backgroundColor: '#ee9a2dff',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    semMesas: {
        textAlign: 'center',
        color: '#555',
        marginTop: 40,
        fontSize: 15,
        lineHeight: 24,
    },
    // Modal de consulta
    modalCard: {
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#444',
        marginTop: 12,
        marginBottom: 4,
    },
    modalValor: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    caixaInfo: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        minHeight: 45,
    },
    caixaTexto: {
        fontSize: 14,
        color: '#333',
    },
    botaoVoltar: {
        backgroundColor: '#e53935',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    botaoVoltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
