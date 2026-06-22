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
                // exibe apenas pedidos não concluidos pela cozinha
                // e que representam mesas com pedido ativo (cadastrados por garçons)
                // (Gerente cria documentos de mesa sem 'pedido' ou com status 'livre')
                if (dados.concluidoCozinha !== true && dados.status === 'ocupada' && dados.pedido) {
                    lista.push({
                        firebaseId: docSnap.id,
                        ...dados
                    });
                }
            });

            // remover possíveis duplicatas pelo número da mesa
            // Normaliza numeroMesa para número inteiro e mantém o documento mais recente (por criadoEm)
            const mapa = new Map();
            const normalizeNumber = (val) => {
                if (val === undefined || val === null) return NaN;
                const s = String(val).trim();
                // tenta converter diretamente
                const n = Number(s);
                if (!Number.isNaN(n)) return n;
                // tenta extrair dígitos (por ex. 'Mesa 5')
                const m = s.match(/(\d+)/);
                return m ? Number(m[1]) : NaN;
            };

            const timeOf = (obj) => {
                if (!obj) return 0;
                const t = obj.criadoEm;
                if (!t) return 0;
                // Firestore Timestamp tem toDate()
                if (typeof t.toDate === 'function') return t.toDate().getTime();
                // JS Date ou string
                const d = new Date(t);
                return isNaN(d.getTime()) ? 0 : d.getTime();
            };

            lista.forEach(item => {
                const num = normalizeNumber(item.numeroMesa);
                const chave = Number.isNaN(num) ? String(item.id || '') : String(num);

                if (!mapa.has(chave)) {
                    // armazena numeroMesa normalizado para uso posterior
                    mapa.set(chave, { ...item, __numeroMesaNorm: num });
                } else {
                    // se já existe, mantém o mais recente (por criadoEm)
                    const existente = mapa.get(chave);
                    const tExist = timeOf(existente);
                    const tItem = timeOf(item);
                    if (tItem > tExist) {
                        mapa.set(chave, { ...item, __numeroMesaNorm: num });
                    }
                }
            });

            // ordenar por número da mesa (crescente). Se não houver número, ordena por id
            const resultadoUnico = Array.from(mapa.values()).sort((a, b) => {
                const na = Number.isNaN(a.__numeroMesaNorm) ? Number(a.id || 0) : a.__numeroMesaNorm;
                const nb = Number.isNaN(b.__numeroMesaNorm) ? Number(b.id || 0) : b.__numeroMesaNorm;
                return na - nb;
            });

            setPedidos(resultadoUnico);
        }, (error) => {
            console.log('Erro ao buscar pedidos:', error);
        });
 
        return () => unsubscribe();
    }, []);
 
const ConcluirPedido = async (pedido) => {
    console.log("=== ENTROU NA FUNÇÃO ===");
    console.log(pedido);

    try {
        console.log("ANTES DO UPDATE");

        await updateDoc(doc(db, "mesas", pedido.firebaseId), {
            concluidoCozinha: true,
            pedidoPronto: true,
        });

        console.log("UPDATE REALIZADO COM SUCESSO");
    } catch (error) {
        console.log("ERRO NO UPDATE");
        console.log(error);
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
                <View key={pedido.firebaseId} style={styles.card}>
 
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
        backgroundColor: '#191414e1',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 40,
    },
    botaoVoltar: {
        alignSelf: 'flex-start',
        backgroundColor: '#208F70',
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
        color: '#fff',
    },
    card: {
        marginBottom: 28,
    },
    labelMesa: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    cardRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    caixaPedido: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderRadius: 6,
        padding: 12,
        minHeight: 110,
        justifyContent: 'flex-start',
    },
    caixaTexto: {
        fontSize: 13,
        color: '#fff',
    },
    caixaObs: {
        fontSize: 12,
        color: '#dcdcdc',
        marginTop: 6,
        fontStyle: 'italic',
    },
    colunaDir: {
        gap: 10,
        alignItems: 'center',
    },
    boxGarcom: {
        backgroundColor: '#208F70',
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
        backgroundColor: '#208F70',
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
        color: '#dcdcdc',
        marginTop: 40,
        fontSize: 15,
    },
});
 