----------------SISTEMA DE LANCHONETE--------------



Aplicativo desenvolvimento em react native para gerenciamento de uma lanchonete, permitindo o controle de pedidos, mesas, funcionários, cardápio e fluxo de produção na cozinha. 

Integrantes: Gustavo Budny, João Gabriel e Kaiki Mariano

OBJETIVO:
O objetivo do sistema é otimizar o atendimento em lanchonetes através da integração entre garçom, cozinha e gerente, proporcionando maior organização, controle e agilidade no processamento dos pedidos.

FUNCIONALIDADES:

COZINHA: 
Visualização de pedidos recebidos
Atualizaçaõ do status dos pedidos

GARÇOM:
Visualização das mesas (ocupadas/livres)
Registro de pedidos
Edição de pedidos
Controle do status das mesas

GERENTE:
Cadastro de funcionários
Exclusão de funcionários
Edição de funcionários
Gerenciamento geral das mesas 
Acompanhamento das operações da lanchonete



TÉCNOLOGIAS UTILIZADAS:

React Native
Expo
JavaScript
Firebase Authentication
Firebase Firestore
React Navigation


INSTALAÇÃO:
1 - Clone o repositório:

git clone https://github.com/1kaiki/Sistema_Lanchonete.git

2 - Acesse a pasta do projeto:

cd Sistema_Lanchonete/Projeto-Mobile

3 - Instale as dependências:

npm install

4 - Execute o projeto:

npx expo start


CONFIGURAÇÃO FIREBASE:


O projeto utiliza Firebase para armazenamento e gerenciamento de dados.

Configure as credenciais do Firebase no arquivo:

Services/FirebaseConfig.js

utilizando as informações do projeto criado no Firebase Console.
