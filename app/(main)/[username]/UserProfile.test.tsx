import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';

// 1. UPDATE THE MOCK USER
// This mock now matches the UserWithLinks type in UserProfile.tsx
const mockUser = {
  username: 'TestUser',
  name: 'Test User',
  image: 'http://example.com/image.png',
  bio: 'This is a test bio.',
  // Update links to have all properties
  links: [
    { 
      id: '1', 
      title: 'Google', 
      url: 'https://google.com', 
      description: null, 
      imageUrl: null, 
      embedType: null 
    },
    { 
      id: '2', 
      title: 'Bing', 
      url: 'https://bing.com', 
      description: null, 
      imageUrl: null, 
      embedType: null 
    },
  ],
  theme: null,
  // Add the new missing properties
  githubUrl: 'https://github.com/test',
  instagramUrl: 'https://instagram.com/test',
  linkedInUrl: 'https://linkedin.com/in/test',
  linkPageFooter: 'This is my test footer note!',
};

// A mock for a user *without* social links or a footer
const mockUserMinimal = {
  ...mockUser,
  bio: null,
  image: null,
  githubUrl: null,
  instagramUrl: null,
  linkedInUrl: null,
  linkPageFooter: null,
}

describe('UserProfile Component', () => {



  // cek jika bio terdisplay
  it('should render the user bio if it exists', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
  });

  // cek jika bio tidak terdisplay
  it('should not render the user bio if it does not exist', () => {
    render(<UserProfile user={mockUserMinimal} />);
    expect(screen.queryByText('This is a test bio.')).not.toBeInTheDocument();
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

  // --- 2. ADD NEW TESTS FOR SOCIALS AND FOOTER ---

  it('should render social links if they exist', () => {
    render(<UserProfile user={mockUser} />);
    
    // We find them by the aria-label we added in UserProfile.tsx
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument();
  });

  it('should not render social links if they do not exist', () => {
    render(<UserProfile user={mockUserMinimal} />);
    
    expect(screen.queryByLabelText('GitHub Profile')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Instagram Profile')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('LinkedIn Profile')).not.toBeInTheDocument();
  });

  it('should render the footer note if it exists', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('This is my test footer note!')).toBeInTheDocument();
  });

  it('should not render the footer note if it does not exist', () => {
    render(<UserProfile user={mockUserMinimal} />);
    expect(screen.queryByText('This is my test footer note!')).not.toBeInTheDocument();
  });

});