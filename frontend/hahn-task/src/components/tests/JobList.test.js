import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('renders router component', () => {
  render(
    <BrowserRouter>
      <div>Test</div>
    </BrowserRouter>
  );
  expect(screen.getByText('Test')).toBeInTheDocument();
});
