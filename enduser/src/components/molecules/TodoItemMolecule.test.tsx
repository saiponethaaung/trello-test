import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import TodoItemMolecule from './TodoItemMolecule';

describe("awef", () => {
    it("It should render component", () => {
        render(<Provider store={store}><TodoItemMolecule listIndex={0} itemIndex={0} todo={{ id: 0, name: "Sample item", status: 0 }} /></Provider>)
        expect(screen.getAllByTestId("todo-item-molecule").length).toBe(2);
        expect(screen.getAllByTestId("todo-item-atom").length).toBe(2);
        expect(screen.getAllByText(/Sample item/i).length).toBe(1);
    })
})