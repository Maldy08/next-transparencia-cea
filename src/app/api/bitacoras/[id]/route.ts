import { NextResponse } from "next/server";
import transparenciaApi from "../../transparencia-api";

interface Segments {
  params: {
    id: number;
  };
}

export async function POST(request: Request, { params }: Segments) {
  
  try {
    const { data } = await transparenciaApi.post(
      `/Bitacora/EliminarBitacora?idBitacora=${params.id}`
    );

    return NextResponse.json({
      result: data,
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}
