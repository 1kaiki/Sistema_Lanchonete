import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from '../Screens/Login/TelaInicial';
import GerenteNav from './GerenteNav'

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

            </Stack.Navigator>
        </NavigationContainer>
    );
}