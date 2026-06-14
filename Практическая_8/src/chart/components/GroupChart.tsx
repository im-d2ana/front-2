import { tGroup } from "../groupdata";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Container from "@mui/material/Container";
import SettingChart from "./SettingChart";
import * as React from 'react';

type GroupProps = {
    data: tGroup;
};

function GroupChart({ data }: GroupProps) {
    const [series, setSeries] = React.useState({
        'Максимальная скорость': true,
        'Средняя скорость': false,
        'Минимальная скорость': false,
    });

    const activeCount = Object.values(series).filter(item => item == true).length;
    let seriesY: any = Object.entries(series)
                        .filter(item => item[1] == true)
                        .map(item => {
                            if (activeCount === 1) {
                                return {'dataKey': item[0], 'label': item[0], 'barLabel': 'value'}
                            }
                            return {'dataKey': item[0], 'label': item[0]}
                        });

    const [isBar, setIsBar] = React.useState(true);

    const chartSetting = {
        yAxis: [{label: 'Скорость (км/ч)'}],
        height: 400,
    };

    return (
        <Container maxWidth='lg'>
            {isBar ? (
                <BarChart dataset={data}
                      xAxis={[{scaleType: 'band', dataKey: 'Группа'}]}
                      series = {seriesY}
                      slotProps={{legend: {position: {vertical: 'bottom', horizontal: 'center'},},}}
                      {...chartSetting} />
            ) : (
                <LineChart dataset={data}
                      xAxis={[{scaleType: 'band', dataKey: 'Группа'}]}
                      series = {seriesY}
                      slotProps={{legend: {position: {vertical: 'bottom', horizontal: 'center'},},}}
                      {...chartSetting} />
            )}

            <SettingChart series={series} setSeries={setSeries}
                          isBar={isBar} setIsBar={setIsBar} />
        </Container>
    );
}

export default GroupChart;