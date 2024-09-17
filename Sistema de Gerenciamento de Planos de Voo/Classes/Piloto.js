// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da classe Piloto

import { validate } from "bycontract";

// Classe Piloto
export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;

    constructor(matricula, nome, habAtiva) {

        //Validações dos paramêtros
        validate(arguments, ["number", "string", "boolean"]);
        if (matricula.length <= 0) {
            throw new Error ("Matrícula digitada inválida");
        }
        if (nome.length <= 0) {
            throw new Error ("Nome digitado inválido");
        }

        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habAtiva;
    }

    get matricula() {
        return this.#matricula;
    }
    get nome() {
        return this.#nome;
    }
    get habilitacao() {
        return this.#habilitacaoAtiva;
    }

    toString() {
        let str = `Piloto: '${this.nome}', Matricula: '${this.matricula}', Habilitação: `;
        if (this.habilitacao === true) {
            str += "Ativa";
        } else { str += "Inativa" }
        
        return str;
    }
}