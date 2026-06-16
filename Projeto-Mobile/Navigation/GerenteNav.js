import { createDrawerNavigator } from '@react-navigation/drawer';

import StackGerente from './StackGerente';
import Cadastro from '../Screens/Gerente/Funcionarios/CadastroGarcom';
import StackFuncionarios from './StackFuncionarios';
import StackCadastro from './StackCadastro';

const Drawer = createDrawerNavigator();

export default function GerenteNav() {

    return(

        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={StackGerente}
                options={{
                    headerShown: true,
                }}
            />

            <Drawer.Screen
                name="Funcionarios"
                component={StackFuncionarios}
                options={{
                    title: 'Funcionários'
                }}
            />

            <Drawer.Screen
                name="CadastroFuncionarios"
                component={StackCadastro}
                options={{
                    title: 'Cadastro de funcionario'
                }}
            />
        </Drawer.Navigator>

    );
}