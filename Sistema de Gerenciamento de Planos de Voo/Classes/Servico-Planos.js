// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 31/08/2024
// Conteúdo: Classe Serviço Planos

export class ServicoPlanos {
    #planos; // Armazena todos os planos de voo
    #altitudeOcupadaPorDiaHoraAerovia;  // Armazena as altitudes ocupadas por dia e horário

    constructor () {
        this.#planos = [];
        this.#altitudeOcupadaPorDiaHoraAerovia = {}; // Exemplo: { "30-09-2024": { "12": [25000, 26000] } }
    }

    // Adiciona o plano de voo à lista de planos
    adicionarPlano(plano) {
        this.#planos.push(plano);
    }

    // Adiciona o plano de voo, garantindo que a altitude esteja disponível na aerovia
    consiste(plano) {
        let data = plano.data;
        let horarioInicial = plano.horario;
        let altitude = plano.altitude;
        let idAerovia = plano.idAerovia;

        // Verifica se a altitude está ocupada naquela data, horário e aerovia
        if (this.verificarAltitudeOcupada(data, horarioInicial, altitude, idAerovia)) {
            console.log("****************");
            console.log("ERRO: Altitude já ocupada nesse horário e nessa aerovia.");
            return false;
        }
    
        // Adiciona o plano e ocupa a altitude para a aerovia
        this.adicionarPlano(plano);
        this.ocuparAltitude(data, horarioInicial, altitude, idAerovia);
        return true;
    }

    // Verifica se a altitude está ocupada naquela data, horário e aerovia
    verificarAltitudeOcupada(data, horarioInicial, altitude, idAerovia) {

        const ocupacoesAerovia = this.#altitudeOcupadaPorDiaHoraAerovia[data] 
            && this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial] 
            && this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial][idAerovia];
    
        if (ocupacoesAerovia) {
            console.log(`Verificação de ocupação: Data: ${data}, Horário: ${horarioInicial}, Altitude: ${altitude}, Aerovia: ${idAerovia}`);
            return ocupacoesAerovia.includes(altitude);  // Verifica se a altitude específica já está ocupada
        }
        return false;
    }

    // Ocupa a altitude naquela data, horário e aerovia
    ocuparAltitude(data, horarioInicial, altitude, idAerovia) {
        if (!this.#altitudeOcupadaPorDiaHoraAerovia[data]) {
            this.#altitudeOcupadaPorDiaHoraAerovia[data] = {};
        }
    
        if (!this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial]) {
            this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial] = {};
        }
    
        if (!this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial][idAerovia]) {
            this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial][idAerovia] = [];
        }
    
        // Adiciona a altitude ocupada para aquele horário e aerovia
        this.#altitudeOcupadaPorDiaHoraAerovia[data][horarioInicial][idAerovia].push(altitude);
        console.log(`Ocupação registrada: Data: ${data}, Horário: ${horarioInicial}, Altitude: ${altitude}, Aerovia: ${idAerovia}`);
    }

    recupera(id) {
        return this.#planos.find(plano => plano.id === id);
    }

    // Recupera todos os planos de voo
    todos() {
        return this.#planos.map(plano => plano.toString()).join(`\n`);
    }
}
