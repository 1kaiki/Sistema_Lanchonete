import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';

export default function VisualizarPedidosGarcom({ navigation, route }) {

    const [pedidos, setPedidos] = useState([]);

    // Recebe a mesa selecionada da tela anterior (caso navegue por parâmetro)
    const mesaSelecionada = route?.params?.mesa || null;

    useEffect(() => {
        // TODO: Defina o nome da coleção no Firebase conforme necessário
        // Usando onSnapshot para atualização em tempo real
        const unsubscribe = onSnapshot(collection(database, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((docSnap) => {
                lista.push({ id: docSnap.id, ...docSnap.data() });
            });

            // Se veio de uma mesa específica, filtra apenas ela
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

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <Text style={styles.titulo}>MESAS ATENDIDAS</Text>

                {pedidos.map((mesa) => (
                    <View key={mesa.id} style={styles.pedidoContainer}>

                        {/* TIPO 1 - Pedido principal */}
                        <Text style={styles.labelTipo}>TIPO 1:</Text>
                        <View style={styles.caixaInfo}>
                            <Text style={styles.caixaTexto}>{mesa.pedido || ''}</Text>
                        </View>

                        {/* TIPO 2 - Com valor total */}
                        <Text style={styles.labelTipo}>TIPO 2:</Text>
                        <View style={styles.rowComValor}>
                            <View style={[styles.caixaInfo, styles.caixaInfoSelected, { flex: 1 }]}>
                                <Text style={styles.caixaTexto}>{mesa.novoPedido || ''}</Text>
                            </View>
                            <View style={styles.caixaValor}>
                                <Text style={styles.valorTexto}>valor total</Text>
                            </View>
                        </View>

                        {/* BEBIDAS - Com botão enviar pedido */}
                        <Text style={styles.labelTipo}>BEBIDAS:</Text>
                        <View style={styles.rowComValor}>
                            <View style={[styles.caixaInfo, { flex: 1 }]}>
                                <Text style={styles.caixaTexto}>{mesa.bebidas || ''}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.botaoEnviar}
                                onPress={() => Alert.alert('Pedido', `Pedido da mesa ${mesa.numeroMesa} enviado!`)}
                            >
                                <Text style={styles.botaoEnviarTexto}>enviar pedido</Text>
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#222',
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
        minHeight: 70,
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
    caixaValor: {
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        padding: 10,
        width: 90,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valorTexto: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    botaoEnviar: {
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        padding: 10,
        width: 90,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoEnviarTexto: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    semPedidos: {
        textAlign: 'center',
        color: '#555',
        marginTop: 30,
        fontSize: 15,
    },
});