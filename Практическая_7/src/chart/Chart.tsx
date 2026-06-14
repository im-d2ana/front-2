import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import { types, wingspans, years } from "./groupdata";
import Footer from "../components/Footer";

import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import * as React from 'react';
import GroupChart from "./components/GroupChart";

type tSelect = 'Тип' | 'Год первого полета' | 'Размах крыла';

function Chart() {
    const [group, setGroup] = React.useState<tSelect>('Тип');
    const [groupData, setGroupData] = React.useState(types);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as tSelect;
        setGroup(selectedValue);
        
        const groupDataMap = {
            'Тип': types,
            'Год первого полета': years,
            'Размах крыла': wingspans,
        };

        setGroupData(groupDataMap[selectedValue]);
    }

    return (
        <div>
            <Navbar active='3' />

            <Box sx={{width: '200px', m: 'auto'}}>
                <FormControl fullWidth>
                    <InputLabel>Группировать по</InputLabel>
                    <Select id='select-group' value={group} label='Группировать по'
                            onChange={handleChange}>
                        <MenuItem value='Тип'> Типу </MenuItem>
                        <MenuItem value='Год первого полета'> Году первого полета</MenuItem>
                        <MenuItem value='Размах крыла'> Размаху крыла </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <GroupChart data={groupData} />
            <GroupGrid data={groupData} />
            <Footer />
        </div>
    );
}

export default Chart;