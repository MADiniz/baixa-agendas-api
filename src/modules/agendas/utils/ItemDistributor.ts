export default class ItemDistributor {
    private quantidadeDoProduto: number;

    private quantidadeDeIds: number;

    private listaDeDistruicao: number[];

    constructor(quantidadeDoProduto: number, quantidadeDeIds: number) {
        this.quantidadeDoProduto = quantidadeDoProduto;
        this.quantidadeDeIds = quantidadeDeIds;
        this.listaDeDistruicao = [];
    }

    public split(): number[] {
        const quantidadeDeProdutosPorId =
            this.quantidadeDoProduto / this.quantidadeDeIds;

        const isQuantidadeDividadaEmInteiro = Number.isInteger(
            quantidadeDeProdutosPorId,
        );

        if (!isQuantidadeDividadaEmInteiro) {
            this.splitProductsProportionally();
        } else {
            this.splitProductsEqually(quantidadeDeProdutosPorId);
        }

        return this.listaDeDistruicao;
    }

    private splitProductsEqually(quantidadeDeProdutosPorId: number) {
        for (
            let indiceDaQuantidade = 0;
            indiceDaQuantidade < this.quantidadeDeIds;
            indiceDaQuantidade += 1
        ) {
            this.listaDeDistruicao.push(quantidadeDeProdutosPorId);
        }
    }

    private splitProductsProportionally() {
        let valorAcumulado = 0;

        for (
            let indiceDaQuantidade = 0;
            indiceDaQuantidade < this.quantidadeDeIds;
            indiceDaQuantidade += 1
        ) {
            if (indiceDaQuantidade < this.quantidadeDeIds - 1) {
                const valorDoIndice = Number.parseFloat(
                    (this.quantidadeDoProduto / this.quantidadeDeIds).toFixed(
                        3,
                    ),
                );

                this.listaDeDistruicao.push(valorDoIndice);
                valorAcumulado += valorDoIndice;
            } else {
                const valorDoIndice = Number.parseFloat(
                    (this.quantidadeDoProduto - valorAcumulado).toFixed(3),
                );

                this.listaDeDistruicao.push(valorDoIndice);
            }
        }
    }
}
