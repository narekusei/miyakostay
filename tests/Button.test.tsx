import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Button } from '../src/components/ui/Button';

describe('Button', () => {
  test('renders an accessible button and handles user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>View details</Button>);

    const button = screen.getByRole('button', { name: 'View details' });
    expect(button).toHaveAttribute('type', 'button');

    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
