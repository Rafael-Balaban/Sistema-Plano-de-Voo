// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da Serviço Pilotos com exemplos de uso

import { validate } from "bycontract";
import { Piloto } from "./Piloto.js";
import { sistema } from "../Main.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

//Classe Servico Pilotos
export class ServicoPilotos {
    constructor() {
        this.pilotos = []
    }

    adicionarPiloto(piloto) {
        validate(piloto, Piloto);
        return this.pilotos.push(piloto);
    }

    escolherPiloto(escolhaPiloto) {
        while (escolhaPiloto !== 1 && escolhaPiloto !== 2) {
            console.log("Valor digitado inválido.");
            escolhaPiloto = parseInt(prompt("Digite sua escolha: "));
        }

        let pilotoEscolhido
        switch (escolhaPiloto) {
            case 1:
                console.log(sistema.servicoPilotos.todos().toString());
                let matriculaPiloto = parseInt(prompt("Digite a matricula do piloto: "));
                pilotoEscolhido = sistema.servicoPilotos.recupera(matriculaPiloto);
                while (!pilotoEscolhido) {
                    console.log("Piloto não encontrado.");
                    matriculaPiloto = parseInt(prompt("Digite a matricula do piloto: "));
                    pilotoEscolhido = sistema.servicoPilotos.recupera(matriculaPiloto);
                }
                break;

            case 2:
                pilotoEscolhido = sistema.servicoPilotos.criarPiloto();
                break;
        }
        
        return pilotoEscolhido;
    }

    criarPiloto() {
        console.log("Primeiro será necessário que o piloto digite seu nº de matrícula, nome e se a habilitação para voar está ativa ou não.");
        console.log("Exemplo: 123, nome, (Ativa ou Inativa)");
        console.log("-----------------");

        //Verificação de matricula
        let matricula;
        do {
            matricula = parseInt(prompt("Número de matrícula: "));
            if (isNaN(matricula)) {
                console.log("A matrícula precisa ser um número!");
            }
        } while (isNaN(matricula));

        // Verificação para caso já exista um piloto com a matrícula digitada
        while (sistema.servicoPilotos.recupera(matricula)) {
            matricula = parseInt(prompt("Matrícula de piloto já existente, escolha um outro número de matrícula: "));
        }

        let nome = prompt("Nome: ");

        //Verificação da habilitação
        let habilitacao;
        habilitacao = prompt("Habilitação: ").toLowerCase();
        while (habilitacao !== "ativa" && habilitacao !== "inativa") {
            console.log("Habilitação digitada inválida.");
            habilitacao = prompt("Digite novamente a habilitação: ").toLowerCase();
        }
        if (habilitacao === "ativa") { habilitacao = true; }
        else { habilitacao = false };

        let pilotoEscolhido = new Piloto(matricula, nome, habilitacao);
        sistema.servicoPilotos.adicionarPiloto(pilotoEscolhido);
        console.log("Piloto criado com sucesso.");

        // Retorna o piloto
        return pilotoEscolhido;
    }

    recupera(matricula) {
        return this.pilotos.find(piloto => piloto.matricula === matricula);
    }

    todos() {
        return this.pilotos.map(piloto => piloto.toString()).join(`\n`);
    }
}

/* 
Exemplo de uso dos piltos somente

const piloto1 = new Piloto("001", "João Silva", true);
const piloto2 = new Piloto("002", "Maria Oliveira", false);

const servicoPilotos = new ServicoPilotos();
servicoPilotos.adicionarPiloto(piloto1);
servicoPilotos.adicionarPiloto(piloto2);

//Recupera um piloto através de sua matricula
console.log(servicoPilotos.recupera("001").toString());

//Recupera todos os pilotos cadastrados
console.log(servicoPilotos.todos().toString());
*/