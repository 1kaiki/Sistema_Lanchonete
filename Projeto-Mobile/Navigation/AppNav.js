import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from '../Screens/Login/TelaInicial';
import GerenteNav from './GerenteNav'
import EscolhaLogin from '../Screens/Login/EscolhaLogin';
import LoginGarcom from '../Screens/Login/LoginGarcom';
import LoginGerente from '../Screens/Login/LoginGerente';
import LoginAtendente from '../Screens/Login/LoginAtendente';
import LoginCozinha from '../Screens/Login/LoginCozinha';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

    return(
        <NavigationContainer>
             <Stack.Navigator>

                <Stack.Screen
                    name="TelaInicial"
                    component={TelaInicial}
                    options={{
                        headerShown: false
                    }}

                />

                <Stack.Screen
                    name="GerenteNav"
                    component={GerenteNav}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="EscolhaLogin"
                    component={EscolhaLogin}
                
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
                

            </Stack.Navigator>
        </NavigationContainer>
    );
}