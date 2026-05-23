import { createDrawerNavigator } from '@react-navigation/drawer';

import StackGerente from './StackGerente';
import Cadastro from '../Screens/Gerente/Funcionarios/CadastroGarcom';
import Visualizacao from '../Screens/Gerente/Funcionarios/Visualizacao';
import StackCadastro from './StackCadastro';

const Drawer = createDrawerNavigator();

export default function GerenteNav() {

    return(

        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={StackGerente}
            />

            <Drawer.Screen
                name="VisualizacaoFuncionario"
                component={Visualizacao}
                options={{
                    title: 'Visualização de funcionario'
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