import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';

const mockUser = {
  username: 'TestUser',
  name: 'Test User',
  image: 'http://example.com/image.png',
  bio: 'This is a test bio.',
  links: [
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'Bing', url: 'https://bing.com' },
  ],
};

describe('UserProfile Component', () => {

  // cek jika bio terdisplay
  it('should render the user bio if it exists', () => {
    render(<UserProfile user={mockUser} />);


    expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
  });

  // cek jika profile image terdisplay
  it('should render the user image if it exists', () => {
    render(<UserProfile user={mockUser} />);

    expect(screen.getByAltText('Test User')).toBeInTheDocument();
  });

  // cek jika link berfungsi
  it('should render the user links', () => {
    render(<UserProfile user={mockUser} />);

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Bing')).toBeInTheDocument();
  });

});