// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação das classes de Aeronaves

import { validate } from "bycontract";

// Classe Aeronave
export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    constructor(prefixo, velocidade, autonomia) {
        validate(arguments, ['string', 'number', 'number']);
        if (prefixo.length <= 0) {
            throw new Error ('Prefixo da Aeronave digitado inválido');
        }
        if (velocidade <= 0 || autonomia <= 0) {
            throw new Error ('Velocidade ou Autonomia da Aeronave digitada inválida');
        }
        
        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidade;
        this.#autonomia = autonomia;
    }

    get prefixo() {
        return this.#prefixo;
    }
    get velocidade() {
        return this.#velocidadeCruzeiro;
    }
    get autonomia() {
        return this.#autonomia;
    }

    toString() {
        let str = `Prefixo: ${this.prefixo}, Velocidade de Cruzeiro: ${this.velocidade}, Autonomia: ${this.autonomia}`;
        return str;
    }
}

// Classe Aeronave Particular, filha da classe Aeronave
export class AeronaveParticular extends Aeronave {
    #respManutencao;

    constructor(prefixo, velocidade, autonomia, respManut) {
        super(prefixo, velocidade, autonomia);
        validate(respManut, 'string');
        if (respManut.length <= 0) {
            throw new Error ('Responsável pela manutenção da aeronave digitado inválido');
        }

        this.#respManutencao = respManut;
    }

    get respManut() {
        return this.#respManutencao;
    }

    toString() {
        let str1 = `Tipo de aeronave: Particular, `;
        let str = `, Responsável pela manutenção da Aeronave: ${this.respManut}`;
        return str1 + super.toString() + str;
    }
}

// Classe Aeronave Comercial, filha da classe Aeronave
export class AeronaveComercial extends Aeronave {
    #nomeCIA;

    constructor(prefixo, velocidade, autonomia, CIA) {
        super(prefixo, velocidade, autonomia);
        validate(CIA, 'string');
        if (CIA.length <= 0) {
            throw new Error ('Companhia digitada inválida');
        }

        this.#nomeCIA = CIA;
    }

    get CIA() {
        return this.#nomeCIA;
    }

    toString() {
        let str = `, Nome da companhia: ${this.CIA}`;
        return super.toString() + str;
    }
}

// Classe Aeronave Passageiros, filha da classe Aeronave Comercial
export class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros;

    constructor(prefixo, velocidade, autonomia, CIA, maxPass) {
        super(prefixo, velocidade, autonomia, CIA);
        validate(maxPass, 'number');
        if (maxPass <= 0) {
            throw new Error ('Quantidade máxima de passageiros digitada inválida');
        }

        this.#maxPassageiros = maxPass;
    }

    get maxPass() {
        return this.#maxPassageiros;
    }

    toString() {
        let str1 = `Tipo de aeronave: Passageiros, `
        let str = `, Máximo de passageiros: ${this.maxPass}`;
        return str1 + super.toString() + str;
    }
}

// Classe Aeronave Carga, filha da classe Aeronave Comercial
export class AeronaveCarga extends AeronaveComercial {
    #pesoMax;

    constructor(prefixo, velocidade, autonomia, CIA, peso) {
        super(prefixo, velocidade, autonomia, CIA);
        validate(peso, 'number');
        if (peso <= 0) {
            throw new Error ('Peso máximo digitado inválido');
        }

        this.#pesoMax = peso;
    }

    get peso() {
        return this.#pesoMax;
    }

    toString() {
        let str1 = `Tipo de aeronave: Carga, `
        let str = `, Peso máximo: ${this.peso}`;
        return str1 + super.toString() + str;
    }
}