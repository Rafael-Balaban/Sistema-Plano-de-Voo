// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 31/08/2024
// Conteúdo: Classe Sistema

import { ServicoPlanos } from './Classes/Servico-Planos.js';
import { ServicoAerovias } from './Classes/Servico-Aerovias.js';
import { OcupacaoAerovia } from './Ocupacao-Aerovia.js';
import { ServicoPilotos } from './Classes/Servico-Pilotos.js';
import { ServicoAeronaves } from './Classes/Servico-Aeronaves.js';

export class Sistema {

    constructor() {
        this.servicoPilotos = new ServicoPilotos();
        this.servicoAeronaves = new ServicoAeronaves();
        this.servicoAerovias = new ServicoAerovias();
        this.servicoPlanos = new ServicoPlanos();
        this.ocupacaoAerovia = new OcupacaoAerovia();
    }

    listarAerovias(origem, destino) {
        return this.servicoAerovias.recuperaAerovias(origem, destino);
    }

    listarAltitudesLivres(idAerovia, data, horario) {
        const aerovia = this.servicoAerovias.find(a => a.id === idAerovia);

        if (!aerovia) {
            throw new Error(`Aerovia com id ${idAerovia} não encontrada.`);
        }

        return aerovia.ocupacaoAerovia.altitudesLivres(data, horario);
    }

    listarPlano(id) {
        return this.servicoPlanos.recupera(id);
    }
}
