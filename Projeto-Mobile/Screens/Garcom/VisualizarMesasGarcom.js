import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../../Services/FirebaseConfig';
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';

export default function VisualizarMesasGarcom({ navigation }) {

    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        // TODO: Defina o nome da coleção no Firebase conforme necessário
        // Usando onSnapshot para atualização em tempo real
        const unsubscribe = onSnapshot(collection(database, 'mesas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });
            setMesas(lista);
        }, (error) => {
            console.log('Erro ao buscar mesas:', error);
        });

        // Limpa o listener ao sair da tela
        return () => unsubscribe();
    }, []);

    const VisualizarPedido = (mesa) => {
        // Navega para a tela de visualizar pedidos passando os dados da mesa
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
                            {/* Card da mesa com status e botão */}
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

                            {/* Botão vermelho/verde - muda conforme chamada do garçom */}
                            <TouchableOpacity
                                style={[
                                    styles.botaoChamada,
                                    { backgroundColor: mesa.chamouGarcom ? '#e53935' : '#43a047' }
                                ]}
                            />
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
    botaoChamada: {
        width: 45,
        height: 45,
        borderRadius: 4,
    },
    semMesas: {
        textAlign: 'center',
        color: '#555',
        marginTop: 30,
        fontSize: 15,
    },
});