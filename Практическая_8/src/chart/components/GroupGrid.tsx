import { tGroup } from "../groupdata";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

type GroupProps = {
    data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
    const rows: GridRowsProp = data;
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1 },
        { field: 'Минимальная скорость', headerName: 'Минимальная скорость', flex: 0.7 },
        { field: 'Максимальная скорость', headerName: 'Максимальная скорость', flex: 0.7 },
        { field: 'Средняя скорость', headerName: 'Средняя скорость', flex: 0.7 },
    ];

    return (
        <Container maxWidth='lg' sx={{ height: '700px', mt: '20px' }}>
            <DataGrid rows={rows} columns={columns} showToolbar={true}
                      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}/>
        </Container>
    );
}

export default GroupGrid;