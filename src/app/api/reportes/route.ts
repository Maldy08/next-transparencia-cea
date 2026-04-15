import { NextResponse } from "next/server";
import transparenciaApi from "../transparencia-api";
import axios from "axios";



export async function GET(request: Request) {
  try {

      const { data } = await transparenciaApi.get(
        'api/Transparencia/Formatos/GetFormatos'
      );

   // const data = axios.get('http://localhost:5178/api/Transparencia/Formatos/GetFormatos');

    return NextResponse.json({
      result: data.data
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}

