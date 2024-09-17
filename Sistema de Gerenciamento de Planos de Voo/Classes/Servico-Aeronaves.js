// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da Serviço Aeronaves com exemplos de uso

import { validate } from 'bycontract';
import { sistema } from '../Main.js';
import {AeronavePassageiros, AeronaveCarga, AeronaveParticular, Aeronave} from './Aeronaves.js';
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

// Classe Servico Aeronaves
export class ServicoAeronaves {
    constructor() {
        this.aeronaves = [];
    }

    adicionarAeronave(aeronave) {
        validate(aeronave, Aeronave);
        return this.aeronaves.push(aeronave);
    }

    todas() {
        return this.aeronaves.map(aeronave => aeronave.toString()).join(`\n`);
    }

    // Função para recuperar uma aeronave pelo prefixo
    recuperaAeronavePorPrefixo(prefixo) {
        return this.aeronaves.find(aeronave => aeronave.prefixo === prefixo);
    }

    escolherAeronave(escolhaAeronave) {
        while (escolhaAeronave !== 1 && escolhaAeronave !== 2) {
            console.log("Valor digitado inválido.");
            escolhaAeronave = parseInt(prompt("Digite sua escolha: "));
        }

        let aeronaveEscolhida;
        switch (escolhaAeronave) {
            case 1:
                console.log(sistema.servicoAeronaves.todas().toString());
                let prefixoAeronaveEscolhida = prompt(("Escreva o prefixo da aeronave de escolha: ")).toUpperCase();
                aeronaveEscolhida = sistema.servicoAeronaves.recuperaAeronavePorPrefixo(prefixoAeronaveEscolhida);
                while (!aeronaveEscolhida) {
                    console.log("Aeronave não encontrada.");
                    prefixoAeronaveEscolhida = prompt(("Escreva o prefixo da aeronave de escolha: ")).toUpperCase();
                    aeronaveEscolhida = sistema.servicoAeronaves.recuperaAeronavePorPrefixo(prefixoAeronaveEscolhida);
                }
                break;
            
            case 2:
                aeronaveEscolhida = sistema.servicoAeronaves.criarAeronave();
                break;
        }

        // Retorna a aeronave criada ou escolhida
        return aeronaveEscolhida;
    }


    criarAeronave() {
        let tipoAeronave;
        do {
            // Solicita a entrada do usuário e converte para minúsculas
            tipoAeronave = prompt("Escreva o tipo da aeronave (passageiros, carga ou particular): ").toLowerCase();

            // Verifica se o valor digitado é válido
            if (tipoAeronave !== "passageiros" && tipoAeronave !== "carga" && tipoAeronave !== "particular") {
                console.log("Tipo de aeronave digitada inválida.");
            }
        } while (tipoAeronave !== "passageiros" && tipoAeronave !== "carga" && tipoAeronave !== "particular");
        
        //Informações da aeronave
        let prefixoAeronave = prompt("Prefixo: ").toUpperCase();
        let velocidadeAeronave = parseInt(prompt("Velocidade em km: "));
        while (isNaN(velocidadeAeronave)) {
            velocidadeAeronave = parseInt(prompt("Velocidade digitada inválida, tente novamente: "));
        }
        let autonomiaAeronave = parseInt(prompt("Autonomia da aeronave: "));
        while (isNaN(autonomiaAeronave)) {
            autonomiaAeronave = parseInt(prompt("Autonomia digitada inválida, tente novamente: "));
        }


        let aeronaveEscolhida;
        switch (tipoAeronave) {
            case "passageiros":
                let cia = prompt("Companhia: ").toUpperCase();
                let maxPass = parseInt(prompt("Máximo de passageiros: "));
                        
                aeronaveEscolhida = new AeronavePassageiros(prefixoAeronave, velocidadeAeronave, autonomiaAeronave, cia, maxPass);
                break;
                            
            case "carga":
                let ciaCarga = prompt("Companhia: ").toUpperCase();
                let peso = parseInt(prompt("Peso máximo: "));
                aeronaveEscolhida = new AeronaveCarga(prefixoAeronave, velocidadeAeronave, autonomiaAeronave, ciaCarga, peso);
                break;
                            
            case "particular":
                let respManut = prompt("Nome dos responsáveis pela manutenção da aeronave: ").toLowerCase();
                aeronaveEscolhida = new AeronaveParticular(prefixoAeronave, velocidadeAeronave, autonomiaAeronave, respManut);
                break;
        }

        sistema.servicoAeronaves.adicionarAeronave(aeronaveEscolhida);
        console.log("Aeronave criada com sucesso.");
        return aeronaveEscolhida;
    }
}

//Exemplo de uso das aeronaves somente
/*
const aviao1 = new AeronavePassageiros("PT-1234", 900, 5000, "Rafaei vamos", 180);
const aviao2 = new AeronaveCarga("PT-5678", 850, 7000, "Rafael Air bus",  10000);
const aviao3 = new AeronaveParticular("PT-9101", 700, 3000, "Carlos Silva");
const aviao4 = new AeronaveComercial("PT-1122", 950, 8000, "Air Brasil");

const servicoAeronaves = new ServicoAeronaves();
servicoAeronaves.adicionarAeronave(aviao1);
servicoAeronaves.adicionarAeronave(aviao2);
servicoAeronaves.adicionarAeronave(aviao3);
servicoAeronaves.adicionarAeronave(aviao4);

// Listar todas as aeronaves
console.log(servicoAeronaves.todas().map(aeronave => aeronave.toString()));
*/