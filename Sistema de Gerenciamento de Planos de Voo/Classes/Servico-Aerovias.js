// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da Serviço Aerovias com exemplos de uso

import { validate } from "bycontract";
import { Aerovia } from "./Aerovia.js";
import { sistema } from "../Main.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

// Classe Servico Aerovias
export class ServicoAerovias {
    constructor() {
        this.aerovias = [];
    }

    adicionarAerovia(aerovia) {
        validate(aerovia, Aerovia);
        return this.aerovias.push(aerovia);
    }

    escolherAerovia(escolhaAerovia) {
        while (escolhaAerovia !== 1 && escolhaAerovia !== 2) {
            console.log("Valor digitado inválido.");
            escolhaAerovia = parseInt(prompt("Digite sua escolha: "));
        }

        switch (escolhaAerovia) {
            case 1:
                //Escolher uma aerovia existente
                console.log(sistema.servicoAerovias.todas().toString());

                let idAeroviaEscolhida = prompt("Escreva o id da aerovia escolhida: ");

                let aeroviaEscolhida = sistema.servicoAerovias.recuperaAeroviasId(idAeroviaEscolhida);
                while (!aeroviaEscolhida) {
                    console.log("Aerovia não encontrada.");
                    console.log("Aerovias existentes:")
                    console.log(sistema.servicoAerovias.todas());
                    console.log("");
                    idAeroviaEscolhida = prompt("Escreva o id da aerovia escolhida: ");
                    aeroviaEscolhida = sistema.servicoAerovias.recuperaAeroviasId(idAeroviaEscolhida);
                }

                console.log("");
                console.log("Aerovia escolhida:");
                console.log(aeroviaEscolhida.toString());
                console.log("");
                return aeroviaEscolhida;
                
            case 2:
                sistema.servicoAerovias.criarAerovia();
                return aeroviaEscolhida;
        }
    }

    criarAerovia() {
        //Criar uma Aerovia
        console.log("Para a criação da aerovia,");
        let idAeroviaNova = prompt("Digite o número de id da Aerovia: ");

        // Verificação para caso já exista uma aerovia com o id digitado
        while (sistema.servicoAerovias.recuperaAeroviasId(idAeroviaNova)) {
            idAeroviaNova = prompt("Id de aerovia já existente, escolha um outro número de id: ");
        }

        let origemAeroviaNova = prompt("Digite a origem da Aerovia: ");
        let destinoAeroviaNova = prompt("Digite o destino da Aerovia: ");
        let tamanhoAerovia = parseInt(prompt("Digite o tamanho da Aerovia em km: "));
        
        let aeroviaEscolhida = new Aerovia(idAeroviaNova, origemAeroviaNova, destinoAeroviaNova, tamanhoAerovia);
        sistema.servicoAerovias.adicionarAerovia(aeroviaEscolhida);
        console.log("Nova Aerovia criada com sucesso.");

        return aeroviaEscolhida;
    }

    recuperaAerovias(origem, destino) {
        return this.aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino === destino);
    }

    recuperaAeroviasId(id) {
        return this.aerovias.find(aerovia => aerovia.id === id);
    }

    todas() {
        return this.aerovias.map(aerovia => aerovia.toString()).join(`\n`);
    }
}

/* 
Exemplo de uso das aerovias somente

const servico = new ServicoAerovias();

const aerovia1 = new Aerovia("1", "São Paulo", "Rio de Janeiro", 5000);
const aerovia2 = new Aerovia("2", "São Paulo", "Belo Horizonte", 1000);

servico.adicionarAerovia(aerovia1);
servico.adicionarAerovia(aerovia2);

const resultado = servico.recuperaAerovias("São Paulo", "Belo Horizonte");
console.log(resultado.toString());
*/