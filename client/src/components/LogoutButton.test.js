// Import necessary functions and components from testing libraries
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Import test compoenent (LogoutButton)
import LogoutButton from './LogoutButton';

// Mock the 'react-router-dom' module to mock the 'useNavigate' function. Solution courtesy of Open AI.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(), //Creates mock behaviour of the useNavigate function.
}));

// Describe test for the 'LogoutButton' component
describe('LogoutButton', () => {
  // Define a test case: it should call 'onLogout' when clicked
  it('calls onLogout when clicked', () => {
    // Create a mock function for 'onLogout'
    const mockOnLogout = jest.fn();

    // Render the 'LogoutButton' component with the mock 'onLogout' function
    const { getByText } = render(<LogoutButton onLogout={mockOnLogout} />);

    // Find an element with the text 'Logout' and simulate a click event
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('Logout'));

    // Expect that the 'mockOnLogout' function has been called. 
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
