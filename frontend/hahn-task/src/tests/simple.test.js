import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('renders hello inside BrowserRouter', () => {
  render(
    <BrowserRouter>
      <div>Hello World</div>
    </BrowserRouter>
  );
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
