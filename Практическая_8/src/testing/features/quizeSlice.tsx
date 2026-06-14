import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListsState {
    lists: string[][];
    choiceAnswers: Record<string, string[]>;
    showResults: boolean;
}

const initialState: ListsState = {
    lists: [],
    choiceAnswers: {},
    showResults: false,
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            state.lists[index] = items;
        },
        setDraggedItems: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items;
            }
        },
        resetList: (state, action: PayloadAction<{index: number; items: string[]}>) => {
            const {index, items} = action.payload;
            state.lists[index] = items;
        },
        setChoiceAnswer: (state, action: PayloadAction<{key: string; answers: string[]}>) => {
            const {key, answers} = action.payload;
            state.choiceAnswers[key] = answers;
        },
        resetChoiceAnswers: (state) => {
            state.choiceAnswers = {};
        },
        setShowResults: (state, action: PayloadAction<boolean>) => {
            state.showResults = action.payload;
        },
    },
});

export const {addList, setDraggedItems, resetList, setChoiceAnswer, resetChoiceAnswers, setShowResults} = listsSlice.actions;
export default listsSlice.reducer;
