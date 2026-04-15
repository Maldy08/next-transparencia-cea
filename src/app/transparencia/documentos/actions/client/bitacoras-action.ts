import transparenciaApi from "@/app/api/transparencia-api";

import axios, { AxiosProgressEvent } from "axios";

export const getBitacoras = async (idusuario: number, formato: string) => {
  try {
    const { data } = await axios.get(`/api/bitacoras/${idusuario}/${formato}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postBitacoras = async (
  formData: FormData,
  setProgress: (t: number) => void
) => {
  // Extraemos los archivos para enviarlos uno por uno
  const archivos = formData.getAll("archivos") as File[];
  const totalArchivos = archivos.length;

  // Acumulamos los resultados de cada archivo para pasarlos todos al modal
  const todosLosResultados: any[] = [];

  for (let i = 0; i < totalArchivos; i++) {
    // Construimos un FormData individual por cada archivo
    const singleFormData = new FormData();
    singleFormData.set("idUsuario", formData.get("idUsuario") as string);
    singleFormData.set("codigo",    formData.get("codigo")    as string);
    singleFormData.set("trimestre", formData.get("trimestre") as string);
    singleFormData.set("periodo",   formData.get("periodo")   as string);
    singleFormData.append("archivos", archivos[i]);

    try {
      const { data } = await transparenciaApi.postForm(
        `api/Transparencia/Bitacoras/CreateBitacora`,
        singleFormData,
        {
          onUploadProgress: (event: AxiosProgressEvent) => {
            // Progreso total = archivos ya enviados + progreso del archivo actual
            const archivoPercent = Math.round((event.loaded * 100) / (event.total ?? 1));
            const totalPercent = Math.round(
              ((i * 100) + archivoPercent) / totalArchivos
            );
            setProgress(totalPercent);
          },
        }
      );
      // El backend puede devolver un objeto o un array; normalizamos a array
      const resultado = data.data;
      if (Array.isArray(resultado)) {
        todosLosResultados.push(...resultado);
      } else if (resultado) {
        todosLosResultados.push(resultado);
      }
    } catch (error) {
      console.log(`Error al subir archivo ${archivos[i].name}:`, error);
    }
  }

  // Si alguno devolvió "modificado" lo detectamos en el hook
  return todosLosResultados;
};
export const deleteBitacora = async (idbitacora: number) => {
  try {
    const { data } = await axios.post(`/api/bitacoras/${idbitacora}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

