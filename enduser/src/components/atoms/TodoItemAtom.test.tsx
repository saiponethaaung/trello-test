import { render, screen } from '@testing-library/react';
import React from 'react';
import TodoItemAtom from './TodoItemAtom';

describe("Todo item atom test", () => {
    it("It should render component", () => {
        render(<TodoItemAtom todo={{ id: 0, name: "Sample item", status: 0 }} />);
        expect(screen.getAllByTestId("todo-item-atom").length).toBe(1);
        expect(screen.getAllByText(/Sample item/i).length).toBe(1);
    })
})