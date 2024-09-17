// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 20/08/2024
// Conteúdo: criação da classe Plano de Voo

import { validate } from "bycontract";

// Classe Plano de Voo
export class PlanoDeVoo {
    static #counter = 0;
    #id;
    #matricPiloto;
    #idAerovia;
    #prefixoAeronave;
    #data;
    #horario;
    #altitude;
    #slots;
    #cancelado;

    constructor(matricPiloto, idAerovia, prefixoAeronave, data, horario, altitude, slots,) {

        validate(arguments, ["number", "string", "string", "string", "number", "number", "array"]);
        if (idAerovia.length <= 0 || matricPiloto.length <= 0 || idAerovia.length <= 0 || data <= 0 || altitude <= 0 || slots.length <= 0) {
            console.log("Erro na criação de um plano de voo");
            return false;
        }

        PlanoDeVoo.#counter++;

        this.#id = PlanoDeVoo.#counter;
        this.#matricPiloto = matricPiloto;
        this.#idAerovia = idAerovia;
        this.#prefixoAeronave = prefixoAeronave;
        this.#data = data;
        this.#horario = horario;
        this.#altitude = altitude;
        this.#slots = slots;
        this.#cancelado = false;
    }

    
    // Getters para acessar as variáveis privadas
    get id() {
        return this.#id;
    }

    get matricPiloto() {
        return this.#matricPiloto;
    }

    get idAerovia() {
        return this.#idAerovia;
    }

    get prefixoAeronave() {
        return this.#prefixoAeronave;
    }

    get data() {
        return this.#data;
    }

    get horario() {
        return this.#horario;
    }

    get altitude() {
        return this.#altitude;
    }

    get slots() {
        return this.#slots;
    }

    get cancelado() {
        return this.#cancelado;
    }

    // Método para cancelar o plano de voo
    cancelar() {
        this.#cancelado = true;
    }

    toString() {
        let str = `Plano de id: ${this.id}, com a aerovia de id ${this.#idAerovia}, prefixo da aeronave: ${this.prefixoAeronave}, na data: ${this.data}, com horário de partida para às ${this.horario} horas, em altitude de ${this.altitude} pés.`;
        return str;
    }
}