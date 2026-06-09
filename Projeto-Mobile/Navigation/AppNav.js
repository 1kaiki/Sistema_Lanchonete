import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//IMPORT GERENTE
import GerenteNav from './GerenteNav'

//IMPORT GARCOM
// import CadastroMesasGarcom from '../Screens/Garcom/CadastroMesasGarcom'
import GarcomNav from './GarcomNav';

// IMPORT COZINHA
import VisualizarPedidosCozinha from '../Screens/Cozinha/VisualizarPedidosCozinha';

//IMPORT DOS LOGINS
import TelaInicial from '../Screens/Login/TelaInicial';
import EscolhaLogin from '../Screens/Login/EscolhaLogin';
import LoginGarcom from '../Screens/Login/LoginGarcom';
import LoginGerente from '../Screens/Login/LoginGerente';
import LoginAtendente from '../Screens/Login/LoginAtendente';
import LoginCozinha from '../Screens/Login/LoginCozinha';

//MENU DE OPCOES
import Alacarte from '../Screens/Cardapio/Alacarte';
import Bebidas from '../Screens/Cardapio/Bebidas';
import Lanches from '../Screens/Cardapio/Lanches';
import Tabuas from '../Screens/Cardapio/Tabuas';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

    return(
        <NavigationContainer>
             <Stack.Navigator>

                <Stack.Screen
                    name="TelaInicial"
                    component={TelaInicial}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="GerenteNav"
                    component={GerenteNav}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="EscolhaLogin" component={EscolhaLogin} />
                <Stack.Screen name="LoginGarcom" component={LoginGarcom} />
                <Stack.Screen name="LoginAtendente" component={LoginAtendente} />
                <Stack.Screen name="LoginCozinha" component={LoginCozinha} />
                <Stack.Screen name="LoginGerente" component={LoginGerente} />

                <Stack.Screen name="Alacarte" component={Alacarte} />
                <Stack.Screen name="Bebidas" component={Bebidas} />
                <Stack.Screen name="Lanches" component={Lanches} />
                <Stack.Screen name="Tabuas" component={Tabuas} />

                <Stack.Screen name="TelaGarcom" component={CadastroMesasGarcom} />
                <Stack.Screen name="VisualizarMesasGarcom" component={VisualizarMesasGarcom} />

                {/* Tela da cozinha - visualiza e conclui pedidos */}
                <Stack.Screen
                    name="VisualizarPedidosCozinha"
                    component={VisualizarPedidosCozinha}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginGarcom"
                    component={LoginGarcom}
                
                />
                <Stack.Screen
                    name="LoginAtendente"
                    component={LoginAtendente}
                />
                
                <Stack.Screen
                    name="LoginCozinha"
                    component={LoginCozinha}
                />
                
                <Stack.Screen
                    name="LoginGerente"
                    component={LoginGerente}
                />
                <Stack.Screen
                    name="Alacarte"
                    component={Alacarte}
                />
                <Stack.Screen
                    name="Bebidas"
                    component={Bebidas}
                />
                <Stack.Screen
                    name="Lanches"
                    component={Lanches}
                />
                <Stack.Screen
                    name="Tabuas"
                    component={Tabuas}
                />
                <Stack.Screen 
                name="VisualizarPedidosCozinha" 
                component={VisualizarPedidosCozinha} 
                />
                <Stack.Screen 
                name="TelaGarcom" 
                component={GarcomNav} 
                options={{ headerShown: false }} 
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
