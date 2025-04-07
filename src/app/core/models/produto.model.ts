export type ProdutoStatus = 'ATIVO' | 'INATIVO';

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidadeEstoque: number;
    categoriaId: number;
    status: ProdutoStatus;
    dataHoraRegistro?: string;
    dataHoraAlteracao?: string;
}

export interface ProdutoRequest {
    nome: string;
    descricao: string;
    preco: number;
    quantidadeEstoque: number;
    categoriaId: number;
    status: ProdutoStatus;
} 