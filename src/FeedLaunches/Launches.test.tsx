import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Launches } from './Launches';

describe('Launches', () => {
    test("renders component with valid data", () => {
        //create test for Launches component

        const entries = [
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
            },
            {
                id: '2',
                mission: {
                    name: 'mission 2'
                },
                rocket: {
                    name: 'rocket 2',
                    type: 'type 2'
                },
                site: 'site 2'
            }
        ];

        render(<Launches entries={entries} />);
        expect(screen.getByText('Launches')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toHaveTextContent('ID: 1');
        expect(screen.getByTestId('launch-item-id-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-2')).toHaveTextContent('ID: 2');

        expect(screen.getByTestId('launch-item-field-mission-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-1')).toHaveTextContent('mission 1');
        expect(screen.getByTestId('launch-item-field-mission-name-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-2')).toHaveTextContent('mission 2');

        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toHaveTextContent('Rocket: rocket 1 (type 1)');
        expect(screen.getByTestId('launch-item-field-rocket-description-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-2')).toHaveTextContent('Rocket: rocket 2 (type 2)');

        expect(screen.getByTestId('launch-item-field-site-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-1')).toHaveTextContent('Site: site 1');
        expect(screen.getByTestId('launch-item-field-site-name-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-2')).toHaveTextContent('Site: site 2');
    });

    test("renders component with empty data", () => {
        const entries = [
            {
                id: '',
                mission: {
                    name: ''
                },
                rocket: {
                    name: '',
                    type: ''
                },
                site: ''
            }
        ];
        render(<Launches entries={entries} />);
        expect(screen.getByText('Launches')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-')).toBeInTheDocument();
    });
});