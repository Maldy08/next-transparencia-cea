'use client'
import { useEffect, useState } from 'react';
import moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getBitacoras } from '../actions/client/bitacoras-action';
import { Progress } from '.';
import { IoTrashBinOutline, IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { TablaBitacoras } from '@/interfaces';
import { useRouter } from 'next/navigation';


interface Props {
    idusuario: number;
    formato: string;
    onDeleteData: (idbitacora: number) => void;
    reload: boolean;
}

const customStyles = {
    headRow: {
        style: {
            background: 'linear-gradient(105deg, #3d0a18 0%, #4b0c1f 20%, #651930 50%, #7a1e39 80%, #8a2242 100%)',
            minHeight: '48px',
            borderRadius: '0',
        },
    },
    headCells: {
        style: {
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            paddingLeft: '20px',
            paddingRight: '20px',
        },
    },
    rows: {
        style: {
            fontSize: '13px',
            minHeight: '48px',
            borderBottom: '1px solid #f5f5f4',
            transition: 'all 150ms ease',
            '&:hover': {
                backgroundColor: '#fcf3f7',
                boxShadow: 'inset 3px 0 0 #951f43',
            },
        },
        stripedStyle: {
            backgroundColor: '#fdfbfa',
        },
    },
    cells: {
        style: {
            paddingLeft: '20px',
            paddingRight: '20px',
        },
    },
    pagination: {
        style: {
            fontSize: '12px',
            color: '#57534e',
            borderTop: '1px solid #f0f0f0',
            minHeight: '52px',
        },
        pageButtonsStyle: {
            borderRadius: '8px',
            fill: '#651930',
            transition: 'all 150ms ease',
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
            backgroundColor: 'transparent',
            padding: '12px 20px',
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
            cell: (row: any) => (
                <span className="text-[11px] font-bold text-gray-400 dark:text-neutral-500 tabular-nums bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                    {row.id}
                </span>
            ),
            width: "100px",

        },

        {
            name: 'HIPERVÍNCULO',
            selector: (row: any) => row.hipervinculo,
            minWidth: "250px",
            wrap: true,
            cell: (row: any) => (
                <a
                    href={row.hipervinculo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 
                        hover:underline underline-offset-2 transition-colors duration-150 text-[12px]"
                >
                    {row.hipervinculo}
                </a>
            ),
        },
        {
            name: 'FECHA',
            selector: (row: any) => moment(row.fechaSubido).format('DD/MM/YYYY'),
            wrap: true,
            maxWidth: "200px",
            cell: (row: any) => (
                <span className="text-gray-500 dark:text-neutral-400 text-[12px]">
                    {moment(row.fechaSubido).format('DD/MM/YYYY')}
                </span>
            ),
        },


        {
            name: 'ACCIONES',
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
                        className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 group"
                    >
                        <IoTrashBinOutline className="w-4 h-4 text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
                    </button>
                </>
        }

    ];

    useEffect(() => {
        setLoading(true)
        setDatos([])
        const getData = async () => {
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
            subHeaderComponent={datos.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-neutral-500" />
                        <input
                            id="search"
                            type="text"
                            placeholder="Buscar documento..."
                            aria-label="Search Input"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value.toUpperCase())}
                            className="h-9 w-52 rounded-xl border border-gray-200 dark:border-neutral-700 
                                bg-gray-50 dark:bg-neutral-800 pl-9 pr-4 text-xs text-gray-700 dark:text-neutral-300
                                placeholder-gray-400 dark:placeholder-neutral-500
                                focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400
                                dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                                hover:border-gray-300 dark:hover:border-neutral-600
                                transition-all duration-200"
                        />
                    </div>
                    {filterText && (
                        <button
                            type="button"
                            onClick={() => setFilterText('')}
                            className="h-9 w-9 flex items-center justify-center rounded-xl
                                bg-primary-800 hover:bg-primary-900 text-white
                                transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <IoCloseOutline className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}
            progressPending={loading}
            progressComponent={<Progress />}
            noDataComponent={
                <div className="py-14 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                        <IoSearchOutline className="w-6 h-6 text-gray-300 dark:text-neutral-600" />
                    </div>
                    <p className="text-sm text-gray-400 dark:text-neutral-500 font-medium">Sin documentos registrados</p>
                    <p className="text-xs text-gray-300 dark:text-neutral-600 mt-1">Selecciona un formato y sube archivos para comenzar</p>
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
