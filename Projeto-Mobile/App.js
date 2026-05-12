import { Provider as PaperProvider } from 'react-native-paper';
import EscolhaLogin from './assets/Login/EscolhaLogin';


export default function App() {
  return (
    <PaperProvider>
      <EscolhaLogin/>
    </PaperProvider>
  );
}