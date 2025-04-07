export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    status: 'ATIVA' | 'INATIVA';
    dataHoraRegistro: string;
    dataHoraAlteracao: string;
}

export interface CategoriaRequest {
    nome: string;
    descricao: string;
} 