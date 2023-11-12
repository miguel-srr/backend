import SphereApi from "../../lib/SphereApi";
import { ok, serverError } from "../helpers";
import { IHttpResponse } from "../protocols";

export class CompilersController {
  async handle(): Promise<IHttpResponse<string>> {
    try {
      const response = await SphereApi.get("compilers");

      const idLinguagens = [86, 1, 5, 10, 56, 116, 57];

      const linguagensFiltradas = response.data.items.filter((x: any) =>
        idLinguagens.includes(x.id)
      );

      return ok<any>(linguagensFiltradas);
    } catch (error) {
      return serverError();
    }
  }
}
