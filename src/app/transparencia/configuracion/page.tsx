import transparenciaApi from "@/app/api/transparencia-api";
import { FormatoDto } from "@/interfaces/Formato";
import { Tabla } from "./Tabla";


export default async function ConfiguracionPage() {

      const { data } =  await transparenciaApi.get<FormatoDto[]>(
        `${process.env.URL}/api/reportes`
      );

    return (
        <div>
            {/* <Tabla data={data.result}/> */}
        </div>
    );
}