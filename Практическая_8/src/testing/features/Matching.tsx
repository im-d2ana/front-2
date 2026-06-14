import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTasks } from '../quizData';
import SortableList from './SortableList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from './quizeSlice';
import { RootState } from '../../store';

interface ComponentProps {
    index: number,
    tasks: tTasks
}

function Matching({ index, tasks }: ComponentProps) {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.lists.lists);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    useEffect(() => {
        if (!lists[index]) {
            const shuffled = [...tasks.map((t) => t.answer)].sort(() => Math.random() - 0.5);
            dispatch(addList({ index, items: shuffled }));
        }
    }, []);

    const userAnswers = lists[index] || [];

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, i) => {
                        const isCorrect = showResults && userAnswers[i] === item.answer;
                        const isWrong   = showResults && userAnswers[i] !== item.answer;
                        return (
                            <ListItem key={i}>
                                <ListItemButton sx={{
                                    border: `1px solid ${showResults ? (isCorrect ? '#4caf50' : isWrong ? '#f44336' : 'grey') : 'grey'}`,
                                    bgcolor: showResults ? (isCorrect ? 'rgba(76,175,80,0.08)' : isWrong ? 'rgba(244,67,54,0.08)' : 'transparent') : 'transparent',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}>
                                    <ListItemText primary={item.question} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
            <Grid size={6}>
                <SortableList index={index} answers={tasks.map(t => t.answer)} correctAnswers={tasks.map(t => t.answer)} />
            </Grid>
        </Grid>
    );
}

export default Matching;
