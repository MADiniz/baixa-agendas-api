interface IBasicAuthtentication {
    username: string;
    password: string;
}

export default interface ICreateRequestDTO {
    url: string;
    auth?: IBasicAuthtentication;
    body?: any;
}
