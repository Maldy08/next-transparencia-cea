'use client'
import { useEffect, useState } from 'react';
import moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import { getBitacoras } from '../actions/client/bitacoras-action';
import { Progress } from '.';
import { IoCopyOutline, IoTrashBinOutline } from 'react-icons/io5';
import { TablaBitacoras } from '@/interfaces';
import { useRouter } from 'next/navigation';


interface Props {
    idusuario: number;
    formato: string;
    onDeleteData: (idbitacora: number) => void;
    reload: boolean;
}

const TextField = styled.input`
height: 32px;
width: 200px;
border-radius: 6px;
border: 1px solid #e5e5e5;
padding: 0 32px 0 16px;
font-size: 12px;

&:hover {
    cursor: pointer;
    border-color: #951f43;
}
&:focus {
    outline: none;
    border-color: #951f43;
    box-shadow: 0 0 0 2px rgba(149, 31, 67, 0.15);
}
`;

const ClearButton = styled.input`
border-radius: 6px;
height: 32px;
width: 32px;
margin-left: 4px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
background: #951f43;
color: white;
border: none;
font-size: 12px;

&:hover {
    background: #651930;
}
`;

const customStyles = {
    headRow: {
        style: {
            background: 'linear-gradient(90deg, #651930 0%, #7a1e39 100%)',
            minHeight: '44px',
            borderRadius: '0',
        },
    },
    headCells: {
        style: {
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            paddingLeft: '16px',
            paddingRight: '16px',
        },
    },
    rows: {
        style: {
            fontSize: '12px',
            minHeight: '40px',
            '&:hover': {
                backgroundColor: '#fcf3f7',
                cursor: 'default',
            },
        },
        stripedStyle: {
            backgroundColor: '#fdf8fb',
        },
    },
    cells: {
        style: {
            paddingLeft: '16px',
            paddingRight: '16px',
        },
    },
    pagination: {
        style: {
            fontSize: '12px',
            color: '#4b5563',
            borderTop: '1px solid #f0f0f0',
        },
        pageButtonsStyle: {
            borderRadius: '6px',
            fill: '#651930',
            '&:hover:not(:disabled)': {
                backgroundColor: '#fcf3f7',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#fbe8f1',
            },
        },
    },
    subHeader: {
        style: {
            backgroundColor: '#fafafa',
            padding: '8px 16px',
            borderBottom: '1px solid #f0f0f0',
        },
    },
};



export const TableBitacoras = ({ idusuario, formato, onDeleteData, reload }: Props) => {

    const [datos, setDatos] = useState([] as TablaBitacoras[])
    const [loading, setLoading] = useState(false)
    const [filterText, setFilterText] = useState('');
    const filteredItems = datos.filter(
        item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
    );

    const router = useRouter();

    const paginacionOpciones = {
        rowsPerPageText: "Registros por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };


    const columnas: TableColumn<TablaBitacoras>[] = [
        {
            name: "ID",
            cell: (row: any) => <div style={ { fontWeight: 'bold', fontSize: '10px'}}>{row.id}</div>,
            width: "100px",

        },

        {
            name: 'HÍPERVINCULO',
            selector: (row: any) => row.hipervinculo,
            minWidth: "250px",
            wrap: true,
            cell: (row: any) => <a href={row.hipervinculo} target="_blank" rel="noreferrer">{row.hipervinculo}</a>,
            style: { cursor: "pointer", ":hover": { textDecoration: "underline", color: "blue", transition: 'all 0.3s' } }

        },
        {
            name: 'FECHA',
            selector: (row: any) => moment(row.fechaSubido).format('DD/MM/YYYY'),
            wrap: true,
            maxWidth: "200px",
        },


        {
            name: 'ACCIÓNES',
            button: true,
            selector: (row: any) => row.id,
            cell: (row: any) =>
                <>
                    <button
                        type="button"
                        title='Eliminar registro'
                        onClick={() => {
                            onDeleteData(row.id)
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-150 group"
                    >
                        <IoTrashBinOutline className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-150" />
                    </button>

{/*                     <button
                        type='button'
                        title='Copiar Hípervinculo'
                        onClick={() => {
                            router.push(`/transparencia/documentos/${row.id}`)
                        }}
                    >
                        <IoCopyOutline className="ml-2 w-5 h-5 text-gray-700 hover:text-gray-950 transition-all hover:h-6 hover:w-6" />
                    </button> */}
                </>
        }

    ];

    useEffect(() => {
        setLoading(true)
        setDatos([])
        const getData = async () => {
            // console.log(formato);
            //console.log(idusuario);
            const { result } = await getBitacoras(idusuario, formato)
                .finally(() => setLoading(false))

            setDatos(result)
        }
        getData()
    }, [formato, reload])


    return (
        <DataTable
            columns={columnas}
            customStyles={customStyles}
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 45, 60, 75]}
            paginationComponentOptions={paginacionOpciones}
            data={filteredItems}
            subHeader
            subHeaderComponent={datos.length > 0 && <><TextField
                id="search"
                type="text"
                placeholder="🔍  Buscar documento..."
                aria-label="Search Input"
                value={filterText}
                onChange={e => setFilterText(e.target.value.toUpperCase())}
            >
            </TextField>
                <ClearButton
                    type="button"
                    value="✕"
                    onClick={() => setFilterText('')} />
            </>}
            progressPending={loading}
            progressComponent={<Progress />}
            noDataComponent={
                <div className="py-10 text-center">
                    <p className="text-sm text-gray-400 font-medium">Sin documentos registrados</p>
                    <p className="text-xs text-gray-300 mt-1">Selecciona un formato y sube archivos para comenzar</p>
                </div>
            }
            fixedHeader
            persistTableHead
            fixedHeaderScrollHeight="400px"
            striped={true}
            dense={false}
        />
    )
}
