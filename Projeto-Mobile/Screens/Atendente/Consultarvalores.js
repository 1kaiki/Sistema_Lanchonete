import { View, Text, StyleSheet, ScrollView} from "react-native";
import { Card } from "react-native-paper";
import { mesas } from "../../db/DBmesas";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CadastroMesasGarcom from '../../Screens/Garcom/CadastroMesasGarcom';

function ConsultarValoresMain({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Consultar Valores</Text>

			

			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={styles.cardsContainer}>
					{mesas.map((mesa) => (
						<Card key={mesa.id} style={styles.card}>
							<Card.Content style={styles.cardContent}>
								<Text style={styles.cardTitle}>{mesa.nome}</Text>
								<View style={styles.cardRow}>
									<Text style={styles.cardLabel}>Pedido:</Text>
									<Text style={styles.cardValue}>{mesa.pedido || '—'}</Text>
								</View>
								<View style={styles.cardRow}>
									<Text style={styles.cardLabel}>Valor:</Text>
									<Text style={styles.cardValue}>{mesa.valor || '—'}</Text>
								</View>
							</Card.Content>
						</Card>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const Drawer = createDrawerNavigator();

export default function Consultarvalores() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="ConsultarValores">
				<Drawer.Screen name="ConsultarValores" component={ConsultarValoresMain} options={{ title: 'Consultar Valores' }} />
				<Drawer.Screen name="CadastroMesas" component={CadastroMesasGarcom} options={{ title: 'Cadastro Mesas (Garçom)' }} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2EB7B",
		paddingTop: 40,
		paddingHorizontal: 16,
	},
	titulo: {
		fontSize: 32,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 24,
		color: "#222",
	},
	scrollContent: {
		paddingBottom: 24,
	},
	cardsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	card: {
		width: "48%",
		backgroundColor: "#D9D9D9",
		borderRadius: 12,
		marginBottom: 16,
	},
	cardContent: {
		padding: 16,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 12,
		color: "#222",
	},
	cardRow: {
		marginBottom: 10,
	},
	cardLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: "#444",
		marginBottom: 4,
	},
	cardValue: {
		fontSize: 16,
		color: "#111",
	},
});
