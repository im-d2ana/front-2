import aircrafts from '../table';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {ruRU} from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function AircraftsGrid() {
    const rows: GridRowsProp = aircrafts;
    const columns: GridColDef[] = [
        {field: 'Название', headerName: 'Название', flex: 1},
        { field: 'Тип', flex: 1},
        { field: 'Год первого полета', flex: 0.5},
        { field: 'Длина', flex: 0.5},
        { field: 'Размах крыла' },
        { field: 'Макс. скорость'},
    ];

    return (
        <Container maxWidth='lg' sx={{height: '700px', mt: '20px'}}>
            <DataGrid rows={rows} columns={columns}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    showToolbar={true} />
        </Container>
    );
}

export default AircraftsGrid;