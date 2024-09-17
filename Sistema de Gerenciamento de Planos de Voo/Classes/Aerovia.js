// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da classe Aerovia

import { validate } from "bycontract";

// Classe Aerovia
export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;
    #ocupacao;

    constructor(id, origem, destino, tamanho) {
        validate(arguments, ["string", "string", "string", "number"]);
        if (id.length <= 0 || origem.length <= 0 || destino.length <= 0 || tamanho <= 0) {
            throw new Error("Dados digitados para a criação de uma aerovia inválidos");
        }

        this.#id = id;
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
        this.#ocupacao = [];
    }

    get id() {
        return this.#id;
    }
    get origem() {
        return this.#origem;
    }
    get destino() {
        return this.#destino;
    }
    get tamanho() {
        return this.#tamanho;
    }

    // Registrar a ocupação de uma altitude
    adicionarOcupacao(ocupacao) {
        this.#ocupacao.push(ocupacao);
    }

    toString() {
        let str = `Aerovia de id ${this.id}, com origem em ${this.origem}, e destino em ${this.destino}, possui tamanho de ${this.tamanho} metros`;
        return str;
    }
}