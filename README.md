# Sistema-Plano-de-Voo
Este código é um sistema de gerenciamento de planos de voo que permite criar pilotos, aeronaves, aerovias, e submeter planos de voo. Ele foi desenvolvido utilizando a linguagem JavaScript e segue princípios de Programação Orientada a Objetos.

*Estrutura do Código*

Importações e Criação de Objetos:
As classes Piloto, Aeronave, Aerovia, PlanoDeVoo e OcupacaoAerovia são importadas de arquivos separados.
Diversos exemplos de aerovias, aeronaves e pilotos são criados para uso no sistema.

Objetos Globais:
Um objeto sistema é criado a partir da classe Sistema, que centraliza a gestão de serviços como pilotos, aeronaves e aerovias.
O sistema também possui um objeto de ocupação de aerovias, responsável por gerenciar as altitudes e horários ocupados em uma determinada data e aerovia.

Fluxo Principal:
O código utiliza um loop while para exibir um menu principal, no qual o usuário pode escolher entre diferentes funcionalidades:

1: Listar Aerovias:
O sistema solicita a origem e destino dos aeroportos e lista as aerovias disponíveis entre eles.

2: Criar Novo Piloto, Aeronave ou Aerovia:
O sistema permite criar novos objetos de aerovias, aeronaves ou pilotos a partir de entradas do usuário.

3: Submeter Plano de Voo:
O usuário escolhe um piloto e uma aeronave para criar um plano de voo. O sistema valida se o piloto possui habilitação e verifica se a autonomia da aeronave é compatível com a distância da aerovia selecionada.

O plano de voo também exige que o usuário informe a data, hora de partida e altitude. Há restrições para altitudes permitidas, dependendo do tipo da aeronave (somente múltiplos de 1000 entre 25000 e 35000 pés, com regras específicas para passageiros e aeronaves particulares). O sistema verifica se o horário e a altitude estão livres para o voo e, caso estejam, cria o plano de voo.

4: Listar um Plano de Voo por ID:
O usuário pode buscar um plano de voo existente a partir do seu ID e visualizar os detalhes.

5: Sair:
Finaliza o programa.

Exemplo de Uso:
Criar um novo plano de voo:
Seleciona um piloto existente.
Escolhe uma aeronave, aerovia, data, hora e altitude.
O sistema valida as entradas e cria o plano se as condições forem atendidas.

Finalidade:
O código visa permitir a criação, gerenciamento e visualização de planos de voo, controlando conflitos de altitude e horário para evitar sobreposições no uso das aerovias.
