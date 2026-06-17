import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
 
import CadastroMesasGarcom from '../Screens/Garcom/CadastroMesasGarcom';
import VisualizarMesasGarcom from '../Screens/Garcom/VisualizarMesasGarcom';
import VisualizarPedidosGarcom from '../Screens/Garcom/VisualizarPedidosGarcom';
import EditarPedidosGarcom from '../Screens/Garcom/EditarPedidosGarcom';
import StatusMesaGarcom from '../Screens/Garcom/StatusMesaGarcom';
 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
 
// Recebe nomeGarcom e repassa para VisualizarMesas via initialParams
function MesasStack({ route }) {
    const nomeGarcom = route?.params?.nomeGarcom || '';
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="VisualizarMesas"
                component={VisualizarMesasGarcom}
                initialParams={{ nomeGarcom }}
            />
            <Stack.Screen name="VisualizarPedidos" component={VisualizarPedidosGarcom} />
        </Stack.Navigator>
    );
}
 
export default function GarcomNav({ route }) {
    const nomeGarcom = route?.params?.nomeGarcom || 'Garçom';
 
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#222',
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#f5f542',
                tabBarInactiveTintColor: '#aaa',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginBottom: 6,
                },
            }}
        >
            <Tab.Screen
                name="CadastrarMesa"
                component={CadastroMesasGarcom}
                initialParams={{ nomeGarcom }}
                options={{
                    tabBarLabel: 'Cadastrar',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🍽️</Text>,
                }}
            />
            <Tab.Screen
                name="MesasStack"
                component={MesasStack}
                initialParams={{ nomeGarcom }}
                options={{
                    tabBarLabel: 'Mesas',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📋</Text>,
                }}
            />
            <Tab.Screen
                name="EditarPedidos"
                component={EditarPedidosGarcom}
                initialParams={{ nomeGarcom }}
                options={{
                    tabBarLabel: 'Editar',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>✏️</Text>,
                }}
            />
            <Tab.Screen
                name="StatusMesa"
                component={StatusMesaGarcom}
                options={{
                    tabBarLabel: 'Status',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text>,
                }}
            />
        </Tab.Navigator>
    );
}