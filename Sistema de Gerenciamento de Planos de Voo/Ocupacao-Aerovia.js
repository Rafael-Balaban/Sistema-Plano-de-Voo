// Projeto de Programação Orientada a Objetos
// Nome: Rafael Rosa Balaban Borba
// Data: 31/08/2024
// Conteúdo: Classe Ocupação Aerovia

export class OcupacaoAerovia {
    #ocupacoes;

    constructor() {
        this.#ocupacoes = new Map();
    }

    // Método para verificar altitudes livres em uma determinada data e intervalo de tempo
    altitudesLivres(dataDesejada, horaInicioDesejada) {
        const altitudesDisponiveis = [];
    
        // Lista de altitudes possíveis (de 25000 a 35000 pés)
        const altitudes = Array.from({ length: 11 }, (_, i) => 25000 + i * 1000); 
        
        altitudes.forEach(altitude => {
            let estaLivre = true;
            
            for (let ocupacao of this.#ocupacoes) {
                const { altitude: altOcupada, data, horaInicial, duracao } = ocupacao;
    
                // Se a data não coincidir, pode-se ignorar essa ocupação
                if (data !== dataDesejada) continue;
    
                // Calcular o horário final do voo
                const horaFinalOcupada = horaInicial + duracao;
    
                // Verificar se a altitude está ocupada no horário e data solicitados
                if (
                    altOcupada === altitude && 
                    ((horaInicioDesejada >= horaInicial && horaInicioDesejada < horaFinalOcupada) ||
                    (horaInicioDesejada + 1 > horaInicial && horaInicioDesejada + 1 <= horaFinalOcupada))
                ) {
                    estaLivre = false;
                    break;
                }
            }
    
            // Se a altitude estiver livre, adicionar à lista
            if (estaLivre) {
                altitudesDisponiveis.push(altitude);
            }
        });
    
        return altitudesDisponiveis;
    }

    ocupa(idAerovia, data, altitude, slot) {
        if (!this.#ocupacoes.has(idAerovia)) {
            this.#ocupacoes.set(idAerovia, []);
        }
    
        // Adiciona uma nova ocupação com detalhes
        this.#ocupacoes.get(idAerovia).push({ data, altitude, slot });
        console.log("");
        console.log(`Ocupação registrada para a aerovia ${idAerovia} no dia ${data}, altitude ${altitude} no slot ${slot}.`);
    }
    
    isOcupado(idAerovia, data, altitude, slot) {
        const ocupacoesAerovia = this.#ocupacoes.get(idAerovia) || [];
        const ocupado = ocupacoesAerovia.some(ocupacao =>
            ocupacao.data === data && ocupacao.altitude === altitude && ocupacao.slot === slot
        );
    
        console.log(`Verificação para aerovia ${idAerovia}, data ${data}, altitude ${altitude}, slot ${slot}: ${ocupado ? 'Ocupado' : 'Livre'}`);
        return ocupado;
    }

    gerarSlotsPorDia(dia, slotsPorDia) {
        if (!slotsPorDia[dia]) {
            slotsPorDia[dia] = Array.from({ length: 24 }, (_, i) => i);  // Gera slots de 0 a 23 para o dia
        }
        return slotsPorDia[dia];
    }

    removerHorasOcupadasPorDia(dia, horaInicial, tempoDeVoo, slotsPorDia) {
        const tempoVooArredondado = Math.ceil(tempoDeVoo);  // Arredonda o tempo de voo para cima
        
        // Gera o array de slots para o dia, se ainda não existir
        let slots = this.gerarSlotsPorDia(dia, slotsPorDia);
        
        // Verifica se os horários necessários estão disponíveis antes de remover
        for (let i = 0; i < tempoVooArredondado; i++) {  // Corrigi para `<` em vez de `<=`
            const horaOcupada = horaInicial + i;
            if (horaOcupada >= 24) {
                console.log("ERRO: Não é possível ocupar horários que ultrapassam 23 horas.");
                return null;  // Retorna null se não puder ocupar os horários
            }
    
            // Verifica se a hora já está ocupada
            if (!slots.includes(horaOcupada)) {
                console.log(`ERRO: O horário ${horaOcupada}:00 já está ocupado.`);
                return null;
            }
        }
    
        // Se todos os horários estão livres, então remove
        for (let i = 0; i < tempoVooArredondado; i++) {  // Corrigi para `<` em vez de `<=`
            const horaOcupada = horaInicial + i;
            const index = slots.indexOf(horaOcupada);
            if (index !== -1) {
                slots.splice(index, 1);  // Remove a hora do array
            }
        }
    
        return slots;  // Retorna os slots atualizados para o dia
    }
}
