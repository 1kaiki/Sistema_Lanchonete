import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
 
export default function CadastroMesasGarcom({ navigation, route }) {
 
    const nomeGarcom = route?.params?.nomeGarcom || 'Garçom';
 
    const [numeroMesa, setNumeroMesa] = useState('');
    const [pedido, setPedido] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [carregando, setCarregando] = useState(false);
 
    const EnviarPedido = async () => {
        if (!numeroMesa || !pedido) {
            Alert.alert('Atenção', 'Preencha o número da mesa e o pedido.');
            return;
        }
 
        setCarregando(true);
        try {
            const mesasRef = collection(db, 'mesas');
            const q = query(mesasRef, where('id', '==', parseInt(numeroMesa)));
            const querySnapshot = await getDocs(q);
 
            if (!querySnapshot.empty) {
                const mesaDoc = querySnapshot.docs[0];
                const dadosMesa = mesaDoc.data();
 
                // REGRA 1: mesa ocupada por OUTRO garçom
                const mesaOcupadaPorOutro =
                    dadosMesa.status === 'ocupada' &&
                    dadosMesa.nomeGarcom &&
                    dadosMesa.nomeGarcom !== nomeGarcom &&
                    dadosMesa.pedido; // só bloqueia se realmente tem pedido ativo
 
                if (mesaOcupadaPorOutro) {
                    Alert.alert(
                        'Mesa Ocupada',
                        `A Mesa ${numeroMesa} já está sendo atendida pelo garçom "${dadosMesa.nomeGarcom}". Aguarde a liberação.`
                    );
                    setCarregando(false);
                    return;
                }
 
                // REGRA 2: o próprio garçom já tem a mesa — permite atualizar normalmente
                await updateDoc(doc(db, 'mesas', mesaDoc.id), {
                    numeroMesa: parseInt(numeroMesa),
                    pedido,
                    observacoes,
                    nomeGarcom,
                    status: 'ocupada',
                    chamouGarcom: false,
                    pedidoPronto: false,
                    concluidoCozinha: false,
                    criadoEm: new Date(),
                });
 
            } else {
                // Mesa não existe ainda no Firebase — cria
                await addDoc(collection(db, 'mesas'), {
                    id: parseInt(numeroMesa),
                    numeroMesa: parseInt(numeroMesa),
                    pedido,
                    observacoes,
                    nomeGarcom,
                    status: 'ocupada',
                    chamouGarcom: false,
                    pedidoPronto: false,
                    concluidoCozinha: false,
                    criadoEm: new Date(),
                });
            }
 
            Alert.alert('Sucesso', `Pedido da Mesa ${numeroMesa} enviado para a cozinha!`);
            setNumeroMesa('');
            setPedido('');
            setObservacoes('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível enviar o pedido.');
            console.log('Erro ao cadastrar mesa:', error);
        }
        setCarregando(false);
    };
 
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/restaurante.jpeg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
 
                <Text style={styles.titulo}>Cadastre a nova mesa</Text>
                <Text style={styles.subtitulo}>Garçom: {nomeGarcom}</Text>
 
                <TextInput
                    placeholder="NÚMERO MESA"
                    placeholderTextColor="#999"
                    value={numeroMesa}
                    onChangeText={setNumeroMesa}
                    style={styles.txtInput}
                    keyboardType="numeric"
                />
 
                <TextInput
                    placeholder="PEDIDO"
                    placeholderTextColor="#999"
                    value={pedido}
                    onChangeText={setPedido}
                    style={styles.txtInput}
                />
 
                <TextInput
                    placeholder="OBSERVAÇÕES"
                    placeholderTextColor="#999"
                    value={observacoes}
                    onChangeText={setObservacoes}
                    style={[styles.txtInput, styles.txtInputFocused]}
                />
 
                <TouchableOpacity
                    style={[styles.botaoEnviar, carregando && { opacity: 0.6 }]}
                    onPress={EnviarPedido}
                    disabled={carregando}
                >
                    {carregando
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.botaoTexto}>ENVIAR PEDIDO</Text>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1 },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9b67bff',
        paddingHorizontal: 30,
        paddingVertical: 40,
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
    logo: { width: 240, height: 70 },
    titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#222' },
    subtitulo: { fontSize: 13, color: '#555', marginBottom: 20 },
    txtInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
        color: '#333',
    },
    txtInputFocused: { borderWidth: 2, borderColor: '#1565C0' },
    botaoEnviar: {
        backgroundColor: '#e53935',
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 10,
    },
    botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
 