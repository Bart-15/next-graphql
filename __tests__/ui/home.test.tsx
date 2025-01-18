import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  test('Home page should display properly', () => {
    render(<Home />);

    const text = screen.getByText(/get started/i);

    expect(text).toBeInTheDocument();
  });
});
