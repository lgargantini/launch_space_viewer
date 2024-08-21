import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Launch } from '../graphql/graphql';
import LaunchComponent from './Launch';

describe('Launch', () => {
    test("renders component with valid data", () => {
        //create test for Launch component

        const entry: Launch = {
            id: '1',
            mission: {
                name: 'mission 1'
            },
            rocket: {
                id: '1',
                name: 'rocket 1',
                type: 'type 1'
            },
            isBooked: false,
            site: 'site 1'
        };

        render(<LaunchComponent {...entry} />);
        expect(screen.getByTestId('launch-item-id-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toHaveTextContent('ID: 1');

        expect(screen.getByTestId('launch-item-field-mission-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-1')).toHaveTextContent('mission 1');

        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toHaveTextContent('Rocket: rocket 1 (type 1)');

        expect(screen.getByTestId('launch-item-field-site-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-1')).toHaveTextContent('Site: site 1');

    });

    test("renders component with empty data", () => {
        const entry: Launch = {
            id: '',
            mission: {
                name: ''
            },
            rocket: {
                id: '',
                name: '',
                type: ''
            },
            isBooked: false,
            site: ''
        };

        render(<LaunchComponent {...entry} />);
        expect(screen.getByTestId('launch-item-id-')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-')).toBeInTheDocument();
    });
});