import { render, screen } from '@testing-library/react';
import PeschereccioDashboard from './Dashboard';
import * as test from "node:test";

test('renders learn react link', () => {
    render(<PeschereccioDashboard />);
    const firma = screen.getByText(/Dashboard Peschereccio v1.0 | Porto di Imperia/i);
    expect(firma).toBeInTheDocument();
});
