import { Provider as PaperProvider } from 'react-native-paper';
import TelaInicial from './assets/Login/TelaInicial';
import TelaGerente from './Screens/Gerente/TelaGerente'; //so para testar a tela do gerente por enquanto


export default function App() {
  return (
    <PaperProvider>
      <TelaGerente/>
    </PaperProvider>
  );
}