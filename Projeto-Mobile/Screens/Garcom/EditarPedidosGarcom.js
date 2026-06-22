import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore';
 
export default function EditarPedidosGarcom({ navigation, route }) {
 
    const nomeGarcom = route?.params?.nomeGarcom || '';
 
    const [mesas, setMesas] = useState([]);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [novoPedido, setNovoPedido] = useState('');
    const [novasObservacoes, setNovasObservacoes] = useState('');
 
    useEffect(() => {
        // Busca apenas mesas ocupadas (com pedido ativo)
const unsubscribe = onSnapshot(
    collection(db, 'mesas'),
    (querySnapshot) => {

        const lista = [];

        querySnapshot.forEach((docSnap) => {

            const dados = docSnap.data();

            if (
                dados.status === 'ocupada' &&
                dados.pedido
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
        console.log('Erro ao buscar mesas:', error);
    }
);
        return () => unsubscribe();
    }, []);
 
    const SelecionarMesa = (mesa) => {
        setMesaSelecionada(mesa);
        setNovoPedido(mesa.pedido || '');
        setNovasObservacoes(mesa.observacoes || '');
    };
 
    const AtualizarPedido = async () => {
        if (!mesaSelecionada) {
            Alert.alert('Atenção', 'Selecione uma mesa primeiro.');
            return;
        }
        if (!novoPedido) {
            Alert.alert('Atenção', 'Preencha o novo pedido.');
            return;
        }
        try {
            await updateDoc(doc(db, 'mesas', mesaSelecionada.id), {
                pedido: novoPedido,
                observacoes: novasObservacoes,
            });
            Alert.alert('Sucesso', `Pedido da Mesa ${mesaSelecionada.numeroMesa} atualizado!`);
            setMesaSelecionada(null);
            setNovoPedido('');
            setNovasObservacoes('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o pedido.');
            console.log('Erro ao atualizar pedido:', error);
        }
    };
 
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
 
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botaoVoltarTexto}>← VOLTAR</Text>
                </TouchableOpacity>
 
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/restaurante.jpeg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
 
                <Text style={styles.titulo}>GERENCIE OS PEDIDOS</Text>
 
                {/* Lista de mesas ativas para selecionar */}
                {mesas.length > 0 && (
                    <View style={styles.listaMesas}>
                        <Text style={styles.labelLista}>Selecione a mesa:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {mesas.map((mesa) => (
                                <TouchableOpacity
                                    key={mesa.id}
                                    style={[
                                        styles.chipMesa,
                                        mesaSelecionada?.id === mesa.id && styles.chipMesaAtivo,
                                    ]}
                                    onPress={() => SelecionarMesa(mesa)}
                                >
                                    <Text style={[
                                        styles.chipTexto,
                                        mesaSelecionada?.id === mesa.id && styles.chipTextoAtivo,
                                    ]}>
                                        Mesa {mesa.numeroMesa}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
 
                {mesas.length === 0 && (
                    <Text style={styles.semMesas}>Nenhuma mesa com pedido ativo.</Text>
                )}
 
                <TextInput
                    placeholder="NOVO PEDIDO"
                    placeholderTextColor="#999"
                    value={novoPedido}
                    onChangeText={setNovoPedido}
                    style={styles.txtInput}
                    editable={!!mesaSelecionada}
                />
 
                <TextInput
                    placeholder="OBSERVAÇÕES"
                    placeholderTextColor="#999"
                    value={novasObservacoes}
                    onChangeText={setNovasObservacoes}
                    style={[styles.txtInput, styles.txtInputObs]}
                    editable={!!mesaSelecionada}
                />
 
                <TouchableOpacity
                    style={[styles.botaoEnviar, !mesaSelecionada && styles.botaoDesabilitado]}
                    onPress={AtualizarPedido}
                    disabled={!mesaSelecionada}
                >
                    <Text style={styles.botaoTexto}>ATUALIZAR PEDIDO</Text>
                </TouchableOpacity>
 
            </View>
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191414e1',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    botaoVoltar: {
        alignSelf: 'flex-start',
        backgroundColor: '#208F70',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    botaoVoltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    logoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 90,
    },
    logo: {
        width: 140,
        height: 70,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#fff',
    },
    listaMesas: {
        width: '100%',
        marginBottom: 20,
    },
    labelLista: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#dcdcdc',
        marginBottom: 8,
    },
    chipMesa: {
        backgroundColor: '#2a2a2a',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    chipMesaAtivo: {
        backgroundColor: '#208F70',
    },
    chipTexto: {
        fontWeight: 'bold',
        color: '#dcdcdc',
        fontSize: 13,
    },
    chipTextoAtivo: {
        color: '#fff',
    },
    semMesas: {
        color: '#dcdcdc',
        fontSize: 14,
        marginBottom: 20,
    },
    txtInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
        color: '#333',
    },
    txtInputObs: {
        borderWidth: 2,
        borderColor: '#1565C0',
    },
    botaoEnviar: {
        backgroundColor: '#208F70',
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 10,
    },
    botaoDesabilitado: {
        backgroundColor: '#aaa',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});