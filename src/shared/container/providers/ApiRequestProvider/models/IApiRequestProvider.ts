import ICreateRequestDTO from "../dtos/ICreateRequestDTO";

export default interface IApiRequestProvider {
    get(data: ICreateRequestDTO): Promise<any>;
    post(data: ICreateRequestDTO): Promise<any>;
    put(data: ICreateRequestDTO): Promise<any>;
    delete(data: ICreateRequestDTO): Promise<any>;
}
