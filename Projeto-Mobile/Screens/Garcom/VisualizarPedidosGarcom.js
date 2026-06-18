import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
 
export default function VisualizarPedidosGarcom({ navigation, route }) {
 
    const [pedidos, setPedidos] = useState([]);
 
    const mesaSelecionada = route?.params?.mesa || null;
 
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((docSnap) => {
                lista.push({ id: docSnap.id, ...docSnap.data() });
            });
 
            if (mesaSelecionada) {
                setPedidos(lista.filter(m => m.id === mesaSelecionada.id));
            } else {
                setPedidos(lista);
            }
        }, (error) => {
            console.log('Erro ao buscar pedidos:', error);
        });
 
        return () => unsubscribe();
    }, []);
 
    const ChamarGarcom = async (mesa) => {
        try {
            await updateDoc(doc(db, 'mesas', mesa.id), {
                chamouGarcom: true,
            });
            Alert.alert('Chamado', `Garçom chamado para a Mesa ${mesa.numeroMesa}!`);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível chamar o garçom.');
            console.log('Erro ao chamar garçom:', error);
        }
    };
 
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
 
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botaoVoltarTexto}>← VOLTAR</Text>
                </TouchableOpacity>
 
                <Text style={styles.titulo}>PEDIDOS DA MESA</Text>
 
                {pedidos.map((mesa) => (
                    <View key={mesa.id} style={styles.pedidoContainer}>
 
                        <Text style={styles.labelMesa}>MESA {mesa.numeroMesa}</Text>
 
                        <Text style={styles.labelTipo}>PEDIDO:</Text>
                        <View style={styles.caixaInfo}>
                            <Text style={styles.caixaTexto}>{mesa.pedido || 'Sem pedido registrado.'}</Text>
                        </View>
 
                        {mesa.observacoes ? (
                            <>
                                <Text style={styles.labelTipo}>OBSERVAÇÕES:</Text>
                                <View style={styles.caixaInfo}>
                                    <Text style={styles.caixaTexto}>{mesa.observacoes}</Text>
                                </View>
                            </>
                        ) : null}
 
                        <View style={styles.rowStatus}>
                            <View style={[
                                styles.indicador,
                                { backgroundColor: mesa.pedidoPronto ? '#43a047' : '#e53935' }
                            ]}>
                                <Text style={styles.indicadorTexto}>
                                    {mesa.pedidoPronto ? 'PRONTO' : 'COZINHA'}
                                </Text>
                            </View>
 
                            <TouchableOpacity
                                style={styles.botaoGarcom}
                                onPress={() => ChamarGarcom(mesa)}
                            >
                                <Text style={styles.botaoGarcomTexto}>CHAMAR GARÇOM</Text>
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
        backgroundColor: '#e9b67bff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#e9b67bff',
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
        marginBottom: 20,
        color: '#222',
    },
    pedidoContainer: {
        marginBottom: 30,
    },
    labelMesa: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 10,
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
        minHeight: 60,
        justifyContent: 'flex-start',
    },
    caixaTexto: {
        fontSize: 13,
        color: '#333',
    },
    rowStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 14,
    },
    indicador: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
    },
    indicadorTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 11,
        textAlign: 'center',
    },
    botaoGarcom: {
        flex: 1,
        backgroundColor: '#222',
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
    },
    botaoGarcomTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    semPedidos: {
        textAlign: 'center',
        color: '#555',
        marginTop: 30,
        fontSize: 15,
    },
});
 