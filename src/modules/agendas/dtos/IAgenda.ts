export default interface IAgenda {
    agenda: string;
    cod_produto: number;
    qtd_pedida: number;
    filial: string;
    codigoFilial: string;
    idsParaUpdate: string;
    status: number;
    cliente: string;
    id?: string;
}
