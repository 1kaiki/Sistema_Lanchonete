import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function VisualizarPedidosCozinha({ navigation }) {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((docSnap) => {
                const dados = docSnap.data();
                if (!dados.concluidoCozinha) {
                    lista.push({ id: docSnap.id, ...dados });
                }
            });
            setPedidos(lista);
        }, (error) => {
            console.log('Erro ao buscar pedidos:', error);
        });

        return () => unsubscribe();
    }, []);

    const ConcluirPedido = async (pedido) => {
        try {
            await updateDoc(doc(db, 'mesas', pedido.id), {
                concluidoCozinha: true,
                pedidoPronto: true,
            });
            Alert.alert('Sucesso', `Pedido da Mesa ${pedido.numeroMesa} concluído! Garçom notificado.`);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível concluir o pedido.');
            console.log('Erro ao concluir pedido:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>

            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.navigate('LoginCozinha')}
            >
                <Text style={styles.botaoVoltarTexto}>← VOLTAR</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>PEDIDOS PENDENTES</Text>

            {pedidos.map((pedido) => (
                <View key={pedido.id} style={styles.card}>

                    <Text style={styles.labelMesa}>PEDIDO MESA {pedido.numeroMesa}:</Text>

                    <View style={styles.cardRow}>

                        <View style={styles.caixaPedido}>
                            <Text style={styles.caixaTexto}>
                                {pedido.pedido || ''}
                            </Text>
                            {pedido.observacoes ? (
                                <Text style={styles.caixaObs}>
                                    Obs: {pedido.observacoes}
                                </Text>
                            ) : null}
                        </View>

                        <View style={styles.colunaDir}>
                            <View style={styles.boxGarcom}>
                                <Text style={styles.boxGarcomTexto}>
                                    GARÇOM:{'\n'}{pedido.nomeGarcom || '-'}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.botaoConcluir}
                                onPress={() => ConcluirPedido(pedido)}
                            >
                                <Text style={styles.botaoConcluirTexto}>CONCLUIR{'\n'}PEDIDO</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            ))}

            {pedidos.length === 0 && (
                <Text style={styles.semPedidos}>Nenhum pedido pendente no momento.</Text>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#f5f542',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 40,
    },
    botaoVoltar: {
        alignSelf: 'flex-start',
        backgroundColor: '#e53935',
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
        marginBottom: 24,
        color: '#222',
    },
    card: {
        marginBottom: 28,
    },
    labelMesa: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    cardRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    caixaPedido: {
        flex: 1,
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        padding: 12,
        minHeight: 110,
        justifyContent: 'flex-start',
    },
    caixaTexto: {
        fontSize: 13,
        color: '#333',
    },
    caixaObs: {
        fontSize: 12,
        color: '#666',
        marginTop: 6,
        fontStyle: 'italic',
    },
    colunaDir: {
        gap: 10,
        alignItems: 'center',
    },
    boxGarcom: {
        backgroundColor: '#29b6f6',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    boxGarcomTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    botaoConcluir: {
        backgroundColor: '#e53935',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    botaoConcluirTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    semPedidos: {
        textAlign: 'center',
        color: '#555',
        marginTop: 40,
        fontSize: 15,
    },
});
