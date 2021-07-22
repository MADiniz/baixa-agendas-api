import { container } from "tsyringe";
import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "@modules/usuarios/providers/HashProvider/implementations/BCryptHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
