import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from '../quizData';
import Matching from './Matching';
import Sorting from './Sorting';
import ChoiceQuestion from './ChoiceQuestion';

import { useDispatch, useSelector } from 'react-redux';
import { resetList, setShowResults, resetChoiceAnswers } from './quizeSlice';
import { RootState } from '../../store';
import React from 'react';

function Quiz() {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.lists.lists);
    const choiceAnswers = useSelector((state: RootState) => state.lists.choiceAnswers);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const handleCheck = () => {
        dispatch(setShowResults(true));
    };

    const handleReset = () => {
        dispatch(setShowResults(false));
        dispatch(resetChoiceAnswers());
        quiz.forEach((item, index) => {
            if (item.type === 'M') {
                const shuffled = [...item.tasks.map((t) => t.answer)].sort(() => Math.random() - 0.5);
                dispatch(resetList({ index, items: shuffled }));
            } else if (item.type === 'S') {
                const shuffled = [...item.tasks.items].sort(() => Math.random() - 0.5);
                dispatch(resetList({ index, items: shuffled }));
            }
        });
    };

    const getMatchingScore = (quizIndex: number, tasks: { question: string; answer: string }[]) => {
        const userAnswers = lists[quizIndex] || [];
        const correct = tasks.map((t) => t.answer);
        return userAnswers.filter((ans, i) => ans === correct[i]).length;
    };

    const getSortingScore = (quizIndex: number, correctItems: string[]) => {
        const userOrder = lists[quizIndex] || [];
        return userOrder.filter((item, i) => item === correctItems[i]).length;
    };

    const getChoiceScore = (quizId: number, tasks: { question: string; options: string[]; correct: string[] }[]) => {
        let score = 0;
        tasks.forEach((task, taskIndex) => {
            const key = `${quizId}-${taskIndex}`;
            const selected = choiceAnswers[key] || [];
            const correct = task.correct;
            const allCorrectSelected = correct.every(c => selected.includes(c));
            const noWrongSelected = selected.every(s => correct.includes(s));
            if (allCorrectSelected && noWrongSelected && selected.length > 0) score++;
        });
        return score;
    };

    const getScore = (item: typeof quiz[number], index: number) => {
        if (item.type === 'M') return { score: getMatchingScore(index, item.tasks), total: item.tasks.length };
        if (item.type === 'S') return { score: getSortingScore(index, item.tasks.items), total: item.tasks.items.length };
        if (item.type === 'C' || item.type === 'MC') return { score: getChoiceScore(item.id, item.tasks), total: item.tasks.length };
        return { score: 0, total: 0 };
    };

    return (
        <Container maxWidth='md'>
            {quiz.map((item, index) => {
                if (item.type === 'M') {
                    return item.tasks.map((_, taskIdx) => {
                        return null;
                    });
                }
                return null;
            })}

            {(() => {
                const blocks: React.ReactElement[] = [];
                let counter = 0;

                quiz.forEach((item, index) => {
                    if (item.type === 'M' || item.type === 'S') {
                        counter++;
                        const num = counter;
                        blocks.push(
                            <Box key={item.id} component='section' sx={{ m: 2, p: 2 }}>
                                <Typography variant='h5' gutterBottom>
                                    {num}. {item.title}
                                </Typography>
                                {item.type === 'M' && <Matching index={index} tasks={item.tasks} />}
                                {item.type === 'S' && <Sorting index={index} correctItems={item.tasks.items} />}
                            </Box>
                        );
                    } else if (item.type === 'C' || item.type === 'MC') {
                        item.tasks.forEach((task, taskIdx) => {
                            counter++;
                            const num = counter;
                            blocks.push(
                                <Box key={`${item.id}-${taskIdx}`} component='section' sx={{ m: 2, p: 2 }}>
                                    <Typography variant='h5' gutterBottom>
                                        {num}. {task.question}
                                    </Typography>
                                    <ChoiceQuestion quizId={item.id} tasks={[task]} taskOffset={taskIdx}
                                                    multiSelect={item.type === 'MC'}/>
                                </Box>
                            );
                        });
                    }
                });

                return blocks;
            })()}

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant='contained' onClick={handleCheck}>Проверить</Button>
                <Button variant='contained' onClick={handleReset}>Начать снова</Button>
            </Box>

            {showResults && (
                <Box component='section' sx={{ m: 2, p: 2 }}>
                    <Typography variant='h5' gutterBottom align='center'>Результаты теста</Typography>
                    {(() => {
                        const rows: React.ReactElement[] = [];
                        let counter = 0;

                        quiz.forEach((item, index) => {
                            if (item.type === 'M' || item.type === 'S') {
                                counter++;
                                const num = counter;
                                const { score, total } = getScore(item, index);
                                const resultText = score === total
                                    ? 'Все ответы верные.'
                                    : `Верных ответов: ${score} из ${total}.`;
                                rows.push(
                                    <Typography key={item.id} variant='body1' sx={{ mb: 1 }} align='center'>
                                        Задание {num}. {resultText}
                                    </Typography>
                                );
                            } else if (item.type === 'C' || item.type === 'MC') {
                                item.tasks.forEach((task, taskIdx) => {
                                    counter++;
                                    const num = counter;
                                    const key = `${item.id}-${taskIdx}`;
                                    const selected = choiceAnswers[key] || [];
                                    const correct = task.correct;
                                    const allCorrectSelected = correct.every(c => selected.includes(c));
                                    const noWrongSelected = selected.every(s => correct.includes(s));
                                    const isCorrect = allCorrectSelected && noWrongSelected && selected.length > 0;
                                    const resultText = isCorrect ? 'Верно.' : 'Неверно.';
                                    rows.push(
                                        <Typography key={`${item.id}-${taskIdx}`} variant='body1' sx={{ mb: 1 }} align='center'>
                                            Задание {num}. {resultText}
                                        </Typography>
                                    );
                                });
                            }
                        });

                        return rows;
                    })()}
                </Box>
            )}
        </Container>
    );
}

export default Quiz;
