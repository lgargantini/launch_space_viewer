//create test for App component
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import App from './App';
import { GET_LAUNCHES } from './data/queries';

test('renders welcome message', () => {
  const mocks = [
    {
      request: {
        query: GET_LAUNCHES,
        variables: {
          pageSize: 5
        }
      },
      result: {
        data: {
          launches: {
            launches: [
              {
                id: '1',
                mission: {
                  name: 'mission 1'
                },
                rocket: {
                  name: 'rocket 1',
                  type: 'type 1'
                },
                site: 'site 1'
              }
            ],
            hasMore: false,
            cursor: ''
          }
        }
      }
    }
  ];
  render(<MockedProvider mocks={mocks} addTypename={false}><App /></MockedProvider>);
  expect(screen.getByText('Front-end challenge')).toBeInTheDocument();
});