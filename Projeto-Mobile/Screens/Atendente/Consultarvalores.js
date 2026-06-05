import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

const mesas = [
	{ id: 1, nome: "Mesa 1", pedido: "", valor: "" },
	{ id: 2, nome: "Mesa 2", pedido: "", valor: "" },
	{ id: 3, nome: "Mesa 3", pedido: "", valor: "" },
	{ id: 4, nome: "Mesa 4", pedido: "", valor: "" },
	{ id: 5, nome: "Mesa 5", pedido: "", valor: "" },
];

export default function Consultarvalores() {
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
									<Text style={styles.cardValue}>{mesa.pedido}</Text>
								</View>
								<View style={styles.cardRow}>
									<Text style={styles.cardLabel}>Valor:</Text>
									<Text style={styles.cardValue}>{mesa.valor}</Text>
								</View>
							</Card.Content>
						</Card>
					))}
				</View>
			</ScrollView>
		</View>
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
