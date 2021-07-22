import ItemDistributionService from "@modules/agendas/services/ItemDistributionService";
import AppError from "@shared/errors/AppError";

let itemDistributionService: ItemDistributionService;

describe("ItemDistributionService", () => {
    beforeEach(() => {
        itemDistributionService = new ItemDistributionService();
    });

    it("should to distribute equally an interger value with ids", () => {
        const quantidade = 10;
        const quantidadeDeIds = 2;
        const numbers = itemDistributionService.execute(
            quantidade,
            quantidadeDeIds,
        );

        expect(numbers).toStrictEqual([5, 5]);
    });

    it("should to distribute an even value with odd numbers of ids", () => {
        const quantidade = 10;
        const quantidadeDeIds = 3;
        const numbers = itemDistributionService.execute(
            quantidade,
            quantidadeDeIds,
        );

        expect(numbers).toStrictEqual([3.333, 3.333, 3.334]);
    });

    it("should to distribute a floating value with odd number of ids", () => {
        const quantidade = 9.5;
        const quantidadeDeIds = 3;
        const numbers = itemDistributionService.execute(
            quantidade,
            quantidadeDeIds,
        );

        expect(numbers).toStrictEqual([3.167, 3.167, 3.166]);
    });

    it("should to distribute a floating value with even number of ids", () => {
        const quantidade = 9.5;
        const quantidadeDeIds = 4;
        const numbers = itemDistributionService.execute(
            quantidade,
            quantidadeDeIds,
        );

        expect(numbers).toStrictEqual([2.375, 2.375, 2.375, 2.375]);
    });

    it("should not to distribute a value with zero", () => {
        const quantidade = 9.5;
        const quantidadeDeIds = 0;

        expect(() =>
            itemDistributionService.execute(quantidade, quantidadeDeIds),
        ).toThrowError(AppError);
    });

    it("should to distribute a value minor than a number of ids", () => {
        const quantidade = 2;
        const quantidadeDeIds = 3;

        const numbers = itemDistributionService.execute(
            quantidade,
            quantidadeDeIds,
        );

        expect(numbers).toStrictEqual([0.667, 0.667, 0.666]);
    });
});
