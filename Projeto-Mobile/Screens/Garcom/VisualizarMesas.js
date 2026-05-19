import { View, Text, StyleSheet } from 'react-native';

export default function VisualizarMesas() {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Neymar é foda</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2EB7B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        fontSize: 20,
        color: '#000'
    }
});