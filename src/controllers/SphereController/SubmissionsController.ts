import { AxiosError } from "axios";
import SphereApi from "../../lib/SphereApi";
import { badRequest, ok, serverError } from "../helpers";
import { IHttpRequest } from "../protocols";

interface ISphereControllerRequest {
  endpoint: string;
  submissionData: object;
}

export class SubmissionsController {
  async post(request: IHttpRequest<ISphereControllerRequest>) {
    try {
      const response = await SphereApi.post(
        "submissions",
        request.body?.submissionData
      );

      if (response.data.id) {
        request.params = {
          ids: response.data.id,
        };

        return this.get(request);
      }

      return ok<any>({
        response: response.data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return badRequest({
          response: error.response?.data,
        });
      }

      return serverError();
    }
  }

  async get(request: IHttpRequest<ISphereControllerRequest>) {
    try {
      let response = await SphereApi.get("submissions/" + request.params.ids);

      while (response.data.executing == true) {
        response = await SphereApi.get("submissions/" + request.params.ids);
      }

      if (response.data.result.streams.error?.uri) {
        response = await SphereApi.get(
          `submissions/${request.params.ids}/error`
        );
      } else if (response.data.result.streams.output?.uri) {
        response = await SphereApi.get(
          `submissions/${request.params.ids}/output`
        );
      } else if (response.data.result.status.code == 11) {
        return badRequest({
          resultadoCompilado: `E${response.data.result.status.code} :: Erro ao compilar código :: Correção: Verifique o código e a linguagem selecionada`,
        });
      }

      return ok<any>({
        resultadoCompilado: response.data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return badRequest({
          resultadoCompilado: error.response?.data,
        });
      }

      return serverError();
    }
  }
}
