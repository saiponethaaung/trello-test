import { fireEvent, render, screen } from '@testing-library/react';
import InputAtom from './InputAtom';

describe("Input atom test", () => {
    it("Test update value callback", () => {
        let value = '';

        render(<InputAtom updateValue={(v) => value = v} />);

        let input = screen.getByTestId('input');

        fireEvent.change(input, { target: { value: 'Sample text' } });

        expect(value).toBe('Sample text');
    })

    it("Test enter key press callback", () => {
        let value = '';

        render(<InputAtom enterEvent={(v) => value = v} />);

        let input = screen.getByTestId('input');

        fireEvent.change(input, { target: { value: 'Sample text' } });

        fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13, keyCode: 13 });

        expect(value).toBe('Sample text');
    })
});