export type CategoriaStatus = 'ATIVA' | 'INATIVA';

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    status: CategoriaStatus;
    dataHoraRegistro: string;
    dataHoraAlteracao: string;
}

export interface CategoriaRequest {
    nome: string;
    descricao: string;
} 