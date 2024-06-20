import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const DataTableFeatures = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Magnitud',
            selector: row => row.attributes.magnitude,
            sortable: true,
        },
        {
            name: 'Ubicación',
            selector: row => row.attributes.place,
            sortable: true,
        },
        {
            name: 'Fecha/Hora',
            selector: row => new Date(row.attributes.time).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Tsunami',
            cell: row => row.attributes.tsunami? 'Sí' : 'No',
            sortable: true,
        },
        {
            name: 'Tipo de Magnitud',
            selector: row => row.attributes.mag_type,
            sortable: true,
        },
        {
            name: 'Título',
            selector: row => row.attributes.title,
            sortable: true,
        },
        {
            name: 'Coordenadas',
            selector: row => `${row.attributes.coordinates.longitude}, ${row.attributes.coordinates.latitude}`,
            sortable: true,
        },
        {
            name: 'URL Externa',
            selector: row => row.links.external_url,
            sortable: true,
        },
    ]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10, // Asume un valor predeterminado si la API no lo proporciona
        total: 0, // Asume un valor predeterminado si la API no lo proporciona
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleChangePage = (newPage) => {
        // Ajusta el número de página para que comience desde 0
        const adjustedNewPage = newPage - 1;
        setPage(adjustedNewPage);
        fetchData(adjustedNewPage);
    };

    const fetchData = async (currentPage) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/features?page=${currentPage}`);
            console.log(response.data);
            setData(response.data.data);
            
            // Calcula totalPages
            const totalPages = Math.ceil(response.data.meta.total / response.data.meta.per_page);
            
            // Actualiza el estado de paginación
            setPagination({
               ...response.data.meta,
                totalPages: totalPages, // Añade totalPages al estado de paginación
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    // En el componente DataTable, asegúrate de pasar totalPages y totalCount
    return (
        <DataTable
            title="Lista de Características Sismológicas"
            columns={columns}
            data={data}
            pagination
            paginationComponentOptions={{
                noRowsPerPage: false,
                showFirstLastButtons: true,
                currentPage: page,
                totalPages: pagination.totalPages, // Asegúrate de pasar totalPages aquí
                totalCount: pagination.total, // Y aquí totalCount
            }}
            onChangePage={handleChangePage}
            fixedHeader
        />
    );
};

export default DataTableFeatures;
