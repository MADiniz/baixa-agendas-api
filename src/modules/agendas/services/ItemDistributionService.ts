import AppError from "@shared/errors/AppError";
import ItemDistributor from "../utils/ItemDistributor";

class ItemDistributionService {
    private itemDistributor: ItemDistributor;

    public execute(
        quantidade: number,
        quantidadeDeIds: number,
    ): number[] | AppError {
        if (quantidadeDeIds <= 0) {
            throw new AppError(
                "Quantidade de ids não informada para distribuição",
            );
        }
        try {
            this.itemDistributor = new ItemDistributor(
                quantidade,
                quantidadeDeIds,
            );
            return this.itemDistributor.split();
        } catch (error) {
            throw new AppError("Erro ao tentar distribuir os produtos");
        }
    }
}

export default ItemDistributionService;
