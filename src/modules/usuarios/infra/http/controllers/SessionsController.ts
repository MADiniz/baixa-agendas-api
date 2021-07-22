import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/usuarios/services/AuthenticateUserService";

interface IUserSession {
    email: string;
    password?: string;
}

export default class SessionsControler {
    public async create(request: Request, response: Response): Promise<any> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );

        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        const iUserSession: IUserSession = user;

        delete iUserSession.password;

        return response.json({ user, token });
    }
}
