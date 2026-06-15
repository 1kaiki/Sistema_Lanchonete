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
                // Exibe apenas mesas com pedido registrado e não concluídas
                if (dados.pedido && !dados.concluidoCozinha) {
                    lista.push({ firebaseId: docSnap.id, ...dados }); // CORRIGIDO: firebaseId
                }
            });
 
            // Ordena por número de mesa crescente
            lista.sort((a, b) => {
                const numA = parseInt(a.numeroMesa) || parseInt(a.id) || 0;
                const numB = parseInt(b.numeroMesa) || parseInt(b.id) || 0;
                return numA - numB;
            });
 
            setPedidos(lista);
        }, (error) => {
            console.log('Erro ao buscar pedidos:', error);
        });
 
        return () => unsubscribe();
    }, []);
 
    const ConcluirPedido = async (pedido) => {
        try {
            await updateDoc(doc(db, 'mesas', pedido.firebaseId), { // CORRIGIDO: firebaseId
                concluidoCozinha: true,
                pedidoPronto: true,
            });
            const numMesa = pedido.numeroMesa || pedido.id;
            Alert.alert('Sucesso', `Pedido da Mesa ${numMesa} concluído! Garçom notificado.`);
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
 
            {pedidos.map((pedido) => {
                const numMesa = pedido.numeroMesa || pedido.id;
                const garcom = pedido.nomeGarcom || 'Não informado';
 
                return (
                    <View key={pedido.firebaseId} style={styles.card}> // CORRIGIDO: firebaseId
 
                        <Text style={styles.labelMesa}>MESA {numMesa}</Text>
 
                        {pedido.editadoEm && (
                            <Text style={styles.editadoTag}>✏️ PEDIDO ATUALIZADO PELO GARÇOM</Text>
                        )}
 
                        <View style={styles.cardRow}>
 
                            <View style={styles.caixaPedido}>
                                <Text style={styles.caixaTexto}>{pedido.pedido}</Text>
                                {pedido.observacoes ? (
                                    <Text style={styles.caixaObs}>Obs: {pedido.observacoes}</Text>
                                ) : null}
                            </View>
 
                            <View style={styles.colunaDir}>
                                {/* Box do garçom */}
                                <View style={styles.boxGarcom}>
                                    <Text style={styles.boxGarcomTexto}>
                                        GARÇOM:{'\n'}{garcom}
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
                );
            })}
 
            {pedidos.length === 0 && (
                <Text style={styles.semPedidos}>Nenhum pedido pendente no momento.</Text>
            )}
 
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#e9b67bff',
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    editadoTag: {
        fontSize: 11,
        color: '#1565C0',
        fontWeight: 'bold',
        marginBottom: 6,
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
    },
    caixaTexto: {
        fontSize: 14,
        color: '#222',
        fontWeight: '500',
    },
    caixaObs: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
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
        paddingHorizontal: 8,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    boxGarcomTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 11,
        textAlign: 'center',
    },
    botaoConcluir: {
        backgroundColor: '#e53935',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 8,
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
 