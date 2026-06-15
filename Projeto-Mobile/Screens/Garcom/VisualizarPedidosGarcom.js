import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function VisualizarPedidosGarcom({ navigation, route }) {

    const [pedidos, setPedidos] = useState([]);

    // Recebe a mesa selecionada da tela anterior (caso navegue por parâmetro)
    const mesaSelecionada = route?.params?.mesa || null;

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((docSnap) => {
                const dados = docSnap.data();
                if (dados.pedido) {
                    lista.push({ id: docSnap.id, ...dados });
                }
            });

            // Se veio de uma mesa específica, filtra apenas ela
            if (mesaSelecionada) {
                setPedidos(lista.filter(m => m.id === mesaSelecionada.id));
            } else {
                lista.sort((a, b) => (a.id || 0) - (b.id || 0));
                setPedidos(lista);
            }
        }, (error) => {
            console.log('Erro ao buscar pedidos:', error);
        });

        return () => unsubscribe();
    }, []);

    const EnviarParaCozinha = async (mesa) => {
        try {
            await updateDoc(doc(db, 'mesas', mesa.id), {
                concluidoCozinha: false,
                pedidoPronto: false,
            });
            Alert.alert('Pedido', `Pedido da Mesa ${mesa.numeroMesa || mesa.id} reenviado para a cozinha!`);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível reenviar o pedido.');
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <Text style={styles.titulo}>
                    {mesaSelecionada
                        ? `PEDIDO - MESA ${mesaSelecionada.numeroMesa || mesaSelecionada.id}`
                        : 'MESAS ATENDIDAS'}
                </Text>

                {pedidos.map((mesa) => (
                    <View key={mesa.id} style={styles.pedidoContainer}>

                        {!mesaSelecionada && (
                            <Text style={styles.mesaLabel}>MESA {mesa.numeroMesa || mesa.id}</Text>
                        )}

                        {/* Pedido principal */}
                        <Text style={styles.labelTipo}>PEDIDO:</Text>
                        <View style={styles.caixaInfo}>
                            <Text style={styles.caixaTexto}>{mesa.pedido || '-'}</Text>
                        </View>

                        {/* Observações */}
                        {mesa.observacoes ? (
                            <>
                                <Text style={styles.labelTipo}>OBSERVAÇÕES:</Text>
                                <View style={styles.caixaInfo}>
                                    <Text style={[styles.caixaTexto, { fontStyle: 'italic' }]}>{mesa.observacoes}</Text>
                                </View>
                            </>
                        ) : null}

                        {/* Status da cozinha */}
                        <Text style={styles.labelTipo}>STATUS COZINHA:</Text>
                        <View style={styles.rowComValor}>
                            <View style={[styles.caixaInfo, styles.caixaInfoSelected, { flex: 1 }]}>
                                <Text style={[
                                    styles.caixaTexto,
                                    { color: mesa.pedidoPronto ? '#43a047' : '#e53935', fontWeight: 'bold' }
                                ]}>
                                    {mesa.pedidoPronto ? '✅ PEDIDO PRONTO' : '⏳ Aguardando cozinha...'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.botaoEnviar}
                                onPress={() => EnviarParaCozinha(mesa)}
                            >
                                <Text style={styles.botaoEnviarTexto}>reenviar{'\n'}pedido</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}

                {pedidos.length === 0 && (
                    <Text style={styles.semPedidos}>Nenhum pedido encontrado.</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#222',
    },
    mesaLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 6,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        paddingBottom: 4,
    },
    pedidoContainer: {
        marginBottom: 30,
    },
    labelTipo: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 5,
        marginTop: 10,
    },
    caixaInfo: {
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        padding: 12,
        minHeight: 50,
        justifyContent: 'flex-start',
    },
    caixaInfoSelected: {
        borderWidth: 2,
        borderColor: '#1565C0',
    },
    caixaTexto: {
        fontSize: 13,
        color: '#333',
    },
    rowComValor: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    botaoEnviar: {
        backgroundColor: '#222',
        borderRadius: 6,
        padding: 10,
        width: 90,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoEnviarTexto: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    semPedidos: {
        textAlign: 'center',
        color: '#555',
        marginTop: 30,
        fontSize: 15,
    },
});
