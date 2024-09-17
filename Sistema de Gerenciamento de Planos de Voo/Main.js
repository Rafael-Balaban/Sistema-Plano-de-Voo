// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 31/08/2024
// Conteúdo: Criação de objetos de exemplos e estrutura base do programa

import PromptSync from "prompt-sync";
const prompt = PromptSync({sigint:true});

import { Piloto } from "./Classes/Piloto.js";
import { AeronaveCarga, AeronaveParticular, AeronavePassageiros } from "./Classes/Aeronaves.js";
import { Aerovia } from "./Classes/Aerovia.js";
import { PlanoDeVoo } from "./Classes/Plano-De-Voo.js";
import { OcupacaoAerovia } from "./Ocupacao-Aerovia.js";
import { Sistema } from "./Sistema.js";

// Criação de Aerovias para uso
const aerovia1 = new Aerovia("001", "Porto Alegre", "Rio de Janeiro", 1000);
const aerovia2 = new Aerovia("002", "Rio de Janeiro", "Porto Alegre", 1000);
const aerovia3 = new Aerovia("101", "FLorianópolis", "Curitiba", 300);
const aerovia4 = new Aerovia("102", "Bahia", "Porto Alegre", 3000);
const aerovia5 = new Aerovia("112", "Porto Alegre", "Natal", 5000);

// Criação de Aeronaves para uso
const aeronaveParticular1 = new AeronaveParticular("PR", 650, 500, "Maria Oliveira");
const aeronaveParticular2 = new AeronaveParticular("PT", 700, 5000, "João Silva");
const aeronavePassageiros1 = new AeronavePassageiros("TG", 850, 12000, "LATAM", 180);
const aeronavePassageiros2 = new AeronavePassageiros("CO", 900, 11000, "Gol", 200);
const aeronaveCarga1 = new AeronaveCarga("FE", 700, 9000, "FedEx", 50000);
const aeronaveCarga2 = new AeronaveCarga("AZ", 1000, 5000, "Amazon", 20000);

// Criação de Pilotos para uso
const piloto1 = new Piloto(12, "Carlos Silva", true);
const piloto2 = new Piloto(65, "Ana Paula", false);
const piloto3 = new Piloto(78, "João Pereira", true);
const piloto4 = new Piloto(34, "Mariana Souza", true);
const piloto5 = new Piloto(98, "Fernando Costa", false);

export const sistema = new Sistema();
sistema.ocupacaoAerovia = new OcupacaoAerovia();


// Adição dos pilotos, aeronaves e aerovias de exemplo ao sistema
sistema.servicoAerovias.adicionarAerovia(aerovia1);
sistema.servicoAerovias.adicionarAerovia(aerovia2);
sistema.servicoAerovias.adicionarAerovia(aerovia3);
sistema.servicoAerovias.adicionarAerovia(aerovia4);
sistema.servicoAerovias.adicionarAerovia(aerovia5);
sistema.servicoAeronaves.adicionarAeronave(aeronaveParticular1);
sistema.servicoAeronaves.adicionarAeronave(aeronaveParticular2);
sistema.servicoAeronaves.adicionarAeronave(aeronavePassageiros1);
sistema.servicoAeronaves.adicionarAeronave(aeronavePassageiros2);
sistema.servicoAeronaves.adicionarAeronave(aeronaveCarga1);
sistema.servicoAeronaves.adicionarAeronave(aeronaveCarga2);
sistema.servicoPilotos.adicionarPiloto(piloto1);
sistema.servicoPilotos.adicionarPiloto(piloto2);
sistema.servicoPilotos.adicionarPiloto(piloto3);
sistema.servicoPilotos.adicionarPiloto(piloto4);
sistema.servicoPilotos.adicionarPiloto(piloto5);

try {
    let terminou = false
    while (!terminou) {
        // Menu de escolha do usuário
        console.log("--------------");
        console.log("Digite o número da opção escolhida:");
        console.log("1 - Listar aerovias existentes entre dois aeroportos.");
        console.log("2 - Criar uma nova aerovia, aeronave ou um novo piloto.");
        console.log("3 - Submeter um plano de voo para aprovação.");
        console.log("4 - Listar um plano a partir de o número de id.");
        console.log("5 - Sair do programa.")
        console.log("--------------");
        let escolha = prompt("Escolha: ");

        switch (escolha) {

            case "1":
                // 1 - Listar aerovias existentes entre dois aeroportos
                let origem = prompt("Origem (Exemplo: Porto Alegre): ");
                let destino = prompt("Destino (Exemplo: Rio de Janeiro): ");

                let aerovias = sistema.listarAerovias(origem, destino);
                if (aerovias.length > 0) {
                    console.log(`Aerovias de ${origem} até ${destino}: `);
                    for (let aerovia of aerovias) {
                        console.log(aerovia.toString());
                    }
                } else {
                    console.log("");
                    console.log("Nenhuma aerovia encontrada.");
                }
                break;
            
            case "2":
                // 2 - Criar uma nova aerovia, aeronave ou um novo piloto
                let escolhaCriar = prompt("Escreva o que deseja criar: ").toLowerCase();

                while (escolhaCriar !== "aerovia" && escolhaCriar !== "aeronave" && escolhaCriar !== "piloto") {
                    cconsole.log("Escolha digitada inválida.");
                    escolhaCriar = prompt("Escreva o que deseja criar: ").toLowerCase();
                }
                console.log("");

                switch (escolhaCriar) {
                    case "aerovia":
                        sistema.servicoAerovias.criarAerovia();
                        break;

                    case "aeronave":
                        sistema.servicoAeronaves.criarAeronave();
                        break;
                    
                    case "piloto":
                        sistema.servicoPilotos.criarPiloto();
                        break;
                }
                break;

            case "3":
                // 3 - Submeter um plano de voo para aprovação

                // Escolha do Piloto
                console.log("-----------------");
                console.log("Agora é necessário selecionar logar com a id do piloto ou cadastrar um novo.");
                console.log("1 - Escolher um piloto já existente.");
                console.log("2 - Cadastrar um novo piloto.");
                console.log("-------------------------")
                let escolhaPiloto = parseInt(prompt("Digite sua escolha: "));

                let pilotoEscolhido = sistema.servicoPilotos.escolherPiloto(escolhaPiloto);

                // Verificação de habilitação do piloto
                if (pilotoEscolhido.habilitacao === false) {
                    console.log("****************");
                    console.log("ERRO: Habilitação para voo inativa.");
                    console.log("****************");
                    break;                    
                }

                // Piloto Criado!
                console.log(`Piloto escolhido: ${pilotoEscolhido.toString()}`);


                // Escolha da Aeronave
                console.log("-----------------");
                console.log("Agora é necessário selecionar a aeronave a ser utilizada.");
                console.log("1 - Escolher uma aeronave já existente.");
                console.log("2 - Criar uma nova aeronave.");
                console.log("-------------------------")
                let escolhaAeronave = parseInt(prompt("Digite sua escolha: "));
                
                let aeronaveEscolhida = sistema.servicoAeronaves.escolherAeronave(escolhaAeronave);

                // Aeronave escolhida!
                console.log(`Aeronave escolhido: ${aeronaveEscolhida.toString()}`);


                // Acessar as informações da aeronave escolhida ou criada
                let prefixoAeronave = aeronaveEscolhida.prefixo;
                let velocidadeAeronave = aeronaveEscolhida.velocidade;
                let autonomiaAeronave = aeronaveEscolhida.autonomia;
                let tipoAeronave = aeronaveEscolhida.constructor.name;


                // Escolha da Aerovia
                console.log("-------------------------")
                console.log("Agora é necessário selecionar a aerovia a ser utilizada.");
                console.log("1 - Escolher uma aerovia já existente.");
                console.log("2 - Criar uma nova aerovia.");
                console.log("-------------------------")
                let escolhaAerovia = parseInt(prompt("Digite sua escolha: "));

                // Aerovia escolhida!
                let aeroviaEscolhida = sistema.servicoAerovias.escolherAerovia(escolhaAerovia);

                // Verificação autonomia da aeronave com o tamanho da aerovia
                if (autonomiaAeronave / aeroviaEscolhida.tamanho < 1.1) {
                    console.log("****************");
                    console.log("ERRO: A autonomia da aeronave tem de ser 10% maior que o tamanho da aerovia!");
                    console.log("****************");
                    break;
                }

                // Criação do plano de voo

                // Data
                let data = prompt(("Agora digite a data escolhida para o voo (exemplo: 30-09-2024): "));

                // Horario de inicio, com verificação para determinado tipo de aeronave
                let horarioInicial = parseInt(prompt("Digite a hora que o voo será realizado, sem ':' (de 0 a 23): "));

                if (tipoAeronave === "AeronaveCarga" && horarioInicial > 6) {
                    while (horarioInicial > 6) {
                        console.log("****************");
                        console.log("Horário de voo digitado inválido, para aeronaves de carga somente horários entre meia noite (0) e seis da manhã (6) são aceitos.");
                        horarioInicial = parseInt(prompt("Digite a hora que o voo será realizado, sem ':' (de 0 a 23): "));
                    }
                }

                // Altitude de voo
                let altitude = parseInt(prompt("Digite a altitude que o voo será realizado (somente múltiplos de 1000 entre 25000 e 35000): "));
                // Verifica se a altitude é um valor múltiplo de 1000 e dentro do intervalo permitido (25000 a 35000)
                while (altitude < 25000 || altitude > 35000 || altitude % 1000 !== 0) {
                    console.log("****************");
                    console.log("Altitude inválida! Somente múltiplos de 1000 entre 25000 e 35000 são aceitos.");
                    altitude = parseInt(prompt("Digite a altitude que o voo será realizado (somente múltiplos de 1000 entre 25000 e 35000): "));
                }

                
                // Verificação adicional para aeronaves de passageiros
                if (tipoAeronave === "AeronavePassageiros") {
                    while (altitude < 28000) {
                        console.log("****************");
                        console.log("Altitude digitada inválida, para aeronaves de passageiros, somente voos acima de 28000 pés são permitidos.");
                        altitude = parseInt(prompt("Digite a altitude que o voo será realizado (somente múltiplos de 1000 entre 28000 e 35000): "));
                        
                        // Verifica se a altitude é múltiplo de 1000 e válida
                        while (altitude < 28000 || altitude > 35000 || altitude % 1000 !== 0) {
                            console.log("****************");
                            console.log("Altitude inválida! Somente múltiplos de 1000 entre 28000 e 35000 são aceitos.");
                            altitude = parseInt(prompt("Digite a altitude que o voo será realizado (somente múltiplos de 1000 entre 28000 e 35000): "));
                        }
                    }

                // Verificação adicional para aeronaves particulares
                } else if (tipoAeronave === "AeronaveParticular") {
                    while (altitude < 25000 || altitude > 27000 || altitude % 1000 !== 0) {
                        console.log("****************");
                        console.log("Altitude digitada inválida, para aeronaves particulares, somente voos entre 25000 e 27000 pés (múltiplos de 1000) são permitidos.");
                        altitude = parseInt(prompt("Digite a altitude que o voo será realizado (somente múltiplos de 1000 entre 25000 e 27000): "));
                    }
                }

                // Calculo do tempo de voo
                let tempoDeVoo = aeroviaEscolhida.tamanho / velocidadeAeronave;


                let slotsPorDia = {};   // Armazena os slots por dia
                let slots = sistema.ocupacaoAerovia.removerHorasOcupadasPorDia(data, horarioInicial, tempoDeVoo, slotsPorDia);

                if (slots !== null) {
                    let planoDeVoo = new PlanoDeVoo(pilotoEscolhido.matricula, aeroviaEscolhida.id, prefixoAeronave, data, horarioInicial, altitude, slots);

                    // Verificar se o plano de voo pode ser criado
                    if (sistema.servicoPlanos.consiste(planoDeVoo)) {
                        console.log("Plano de voo criado com sucesso.");
                        console.log(sistema.servicoPlanos.todos());

                    } else {
                        console.log("****************")
                        console.log("ERRO: Não foi possível criar o plano de voo.");
                        console.log("****************");
                        
                    }
                } else {
                    console.log("****************");
                    console.log("ERRO: Horários ocupados. Não é possível criar o plano de voo.");
                    console.log("****************");
                }
                break;
                
            case "4":
                // 4 - Listar um plano de voo apartir de um número de id
                let id = parseInt(prompt("Digite o Id do plano de voo que deseja visualizar: "));
                let plano = sistema.servicoPlanos.recupera(id);
                if (plano) {
                    console.log(plano.toString());
                } else {
                    console.log("Plano não encontrado.");
                }
                break;

            case "5":
                // 5 - Finalizar o programma
                console.log("Programa finalizado.")
                terminou = true;
                break;
            }
    }

} catch (error) {
    console.log(error.message);
}