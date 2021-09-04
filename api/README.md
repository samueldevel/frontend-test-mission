## Missão teste

Esta é uma missão inicial para teste de suas habilidades Jedi com React

### Armas necessárias na missão

O projeto deve ser desenvolvido em React, e utilizar Context administrar o estado do carrinho de compras e ser criado com create-react-app.

O Front-End deve utilizar Material UI: https://material-ui-next.com/
Os formulários deve utilizar o Formik: https://jaredpalmer.com/formik/

Os produtos disponíveis devem ser recuperados através de um mock de API Rest que já existe neste projeto. Você pode  iniciar a api com `npm run api`

### A missão
#### Carrinho de Compras

Seu objetivo é montar um carrinho de compras simples, conforme o prototipo a seguir:

O layout deve ser como de um site de vendas convencional, com uma listagem de produtos, e um icone de carrinho de compras no topo do site.

O icone do carrinho de compras deve exibir uma badge com a quantidade de itens presente no carrinho.

A tela de listagem de produtos deve:

Listar produtos
Ao entrar no projeto, deve exibir os produtos na listagem com foto, titulo e preço formatado em reais;
Ao clicar no produto da lista, deve exibir os detalhes de um produto individual;
Permitir comprar
Ao clicar em comprar, e o produto não estiver no carrinho, deve ser adicionado;
Ao clicar em comprar, e o produto ja existir no carrinho, deve ser incrementado em 1;
Exibir resumo do carrinho
Exibir no icone do carrinho uma badge com quantidade de itens;
Exibir ao lado do icone, o valor total da compra;
O carrinho deve:

Permitir remover itens;
Ao remover, liberar o estoque do produto;
Permitir alterar a quantidade de um item;
Ao clicar em aumentar, deve incrementar em 1;
Ao clicar em diminuir, deve decrementar em 1;
Ao incrementar, deve validar se o produto ainda possui estoque;
Ao decrementar, deve liberar o estoque do produto;
Não deve permitir o usuário informar quantidade zero;
Exibir o somatório total dos itens incluidos;
A finalização do pedido deve:

Ter um formulário de finalização com os seguintes campos e validação:
Nome
Email
CPF
Endereço
Cep
Rua
Bairro
Número
Serviço Rest

### Que força esteja com você
