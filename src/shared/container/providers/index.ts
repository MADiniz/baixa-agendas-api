import { container } from "tsyringe";
import IApiRequestProvider from "@shared/container/providers/ApiRequestProvider/models/IApiRequestProvider";
import AxiosApiRequestProvider from "@shared/container/providers/ApiRequestProvider/implementations/AxiosApiRequestProvider";

container.registerSingleton<IApiRequestProvider>(
    "ApiRequestProvider",
    AxiosApiRequestProvider,
);
