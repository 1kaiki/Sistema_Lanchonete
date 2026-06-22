import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
 
export default function VisualizarMesasGarcom({ navigation, route }) {
    console.log(route.params);
    // Tenta pegar o nomeGarcom passado pela navegação
    const nomeGarcom = route?.params?.nomeGarcom || '';
 
    const [mesas, setMesas] = useState([]);
 
    useEffect(() => {
        const unsubscribe = onSnapshot(
    collection(db, 'mesas'),
    (querySnapshot) => {

        const lista = [];

querySnapshot.forEach((docSnap) => {

    const dados = docSnap.data();

    if (
        dados.status === 'ocupada' &&
        dados.pedido &&
        dados.id
    ) {
        lista.push({
            firebaseId: docSnap.id,
            ...dados
        });
    }

});

        lista.sort((a, b) => {
            return (a.id || 0) - (b.id || 0);
        });

        setMesas(lista);

    },
    (error) => {
        console.log(
            'Erro ao buscar mesas:',
            error
        );
    }
);
 
        return () => unsubscribe();
    }, []);
 
    const VisualizarPedido = (mesa) => {
        navigation.navigate('VisualizarPedidos', { mesa });
    };
 
    const LiberarMesa = (mesa) => {
        Alert.alert(
            'Liberar Mesa',
            `Tem certeza que deseja liberar a Mesa ${mesa.numeroMesa || mesa.id}? Isso encerrará o atendimento.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Liberar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await updateDoc(doc(db, 'mesas', mesa.firebaseId), {
                                pedido: '',
                                observacoes: '',
                                nomeGarcom: '',
                                status: 'livre',
                                chamouGarcom: false,
                                pedidoPronto: false,
                                concluidoCozinha: false,
                                criadoEm: null,
});
                            Alert.alert('Mesa Liberada', `Mesa ${mesa.numeroMesa || mesa.id} está livre novamente.`);
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível liberar a mesa.');
                            console.log(error);
                        }
                    }
                }
            ]
        );
    };
 
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <Text style={styles.titulo}>MESAS ATENDIDAS</Text>
 
                {mesas.map((mesa) => {
                    const ehDono = nomeGarcom && mesa.nomeGarcom === nomeGarcom;
 
                    return (
                        <View key={mesa.firebaseId} style={styles.mesaContainer}>
 
                            <View style={styles.mesaHeader}>
                                <Text style={styles.mesaNome}>MESA {mesa.id}</Text>
                                <Text style={styles.mesaGarcom}>👤 {mesa.nomeGarcom || 'Garçom não identificado'}</Text>
                            </View>
 
                            <View style={styles.mesaRow}>
                                <View style={[styles.mesaCard, !ehDono && styles.mesaCardBloqueada]}>
 
                                    {!ehDono && (
                                        <View style={styles.bannerBloqueado}>
                                            <Text style={styles.bannerTexto}>🔒 Atendida por outro garçom</Text>
                                        </View>
                                    )}
 
                                    <Text style={styles.statusTexto}>
                                        STATUS: {mesa.status ? mesa.status.toUpperCase() : 'OCUPADA'}
                                    </Text>
 
                                    <Text style={styles.pedidoLabel}>PEDIDO:</Text>
                                    <Text style={styles.pedidoTexto}>{mesa.pedido || '-'}</Text>
 
                                    {mesa.observacoes ? (
                                        <>
                                            <Text style={styles.pedidoLabel}>OBS:</Text>
                                            <Text style={styles.obsTexto}>{mesa.observacoes}</Text>
                                        </>
                                    ) : null}
 
                                    <TouchableOpacity
                                        style={styles.botaoVisualizar}
                                        onPress={() => VisualizarPedido(mesa)}
                                    >
                                        <Text style={styles.botaoVisualizarTexto}>VISUALIZAR PEDIDO</Text>
                                    </TouchableOpacity>
 
                                    {/* Botão liberar — só aparece para o dono da mesa */}
                                    {ehDono && (
                                        <TouchableOpacity
                                            style={styles.botaoLiberar}
                                            onPress={() => LiberarMesa(mesa)}
                                        >
                                            <Text style={styles.botaoLiberarTexto}>✅ LIBERAR MESA</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
 
                                <View style={styles.colunaIndicadores}>
                                    <View style={[
                                        styles.indicador,
                                        { backgroundColor: mesa.chamouGarcom ? '#e53935' : '#43a047' }
                                    ]}>
                                        <Text style={styles.indicadorTexto}>
                                            {mesa.chamouGarcom ? 'CHAMA' : 'OK'}
                                        </Text>
                                    </View>
 
                                    <View style={[
                                        styles.indicador,
                                        { backgroundColor: mesa.pedidoPronto ? '#43a047' : '#e53935' }
                                    ]}>
                                        <Text style={styles.indicadorTexto}>
                                            {mesa.pedidoPronto ? 'PRONTO' : 'COZINHA'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
 
                        </View>
                    );
                })}
 
                {mesas.length === 0 && (
                    <Text style={styles.semMesas}>Nenhuma mesa com pedido registrado.</Text>
                )}
 
            </View>
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    scrollContainer: { flex: 1, backgroundColor: '#191414e1' },
    container: { flex: 1, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#191414e1' },
    titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' },
    mesaContainer: { marginBottom: 20 },
    mesaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    mesaNome: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
    mesaGarcom: { fontSize: 12, color: '#dcdcdc', fontStyle: 'italic' },
    mesaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    mesaCard: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderRadius: 6,
        padding: 12,
    },
    mesaCardBloqueada: {
        opacity: 0.75,
        borderWidth: 1,
        borderColor: '#444',
    },
    bannerBloqueado: {
        backgroundColor: '#ffcc00',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    bannerTexto: { fontSize: 11, fontWeight: 'bold', color: '#222' },
    statusTexto: { fontSize: 12, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
    pedidoLabel: { fontSize: 11, fontWeight: 'bold', color: '#dcdcdc', marginTop: 4 },
    pedidoTexto: { fontSize: 13, color: '#fff', marginBottom: 4 },
    obsTexto: { fontSize: 12, color: '#dcdcdc', fontStyle: 'italic', marginBottom: 4 },
    botaoVisualizar: {
        backgroundColor: '#208F70',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    botaoVisualizarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    botaoLiberar: {
        backgroundColor: '#208F70',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    botaoLiberarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    colunaIndicadores: { gap: 8, alignItems: 'center' },
    indicador: {
        width: 50,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicadorTexto: { color: '#fff', fontWeight: 'bold', fontSize: 9, textAlign: 'center' },
    semMesas: { textAlign: 'center', color: '#dcdcdc', marginTop: 30, fontSize: 15 },
});
 