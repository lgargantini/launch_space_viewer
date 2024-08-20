import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Feed } from "./Feed";
import { MockedProvider } from "@apollo/client/testing";
import { GET_LAUNCHES } from "../data/queries";

function scroll(scrollTop: number, offsetHeight: number) {
    const event = new Event('scroll', { bubbles: false });

    Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        configurable: true,
        value: scrollTop,
    });
    Object.defineProperty(document.documentElement, 'offsetHeight', {
        writable: true,
        configurable: true,
        value: offsetHeight,
    });
    window.dispatchEvent(event);
}

describe('Feed', () => {
    test("renders loading component", () => {
        const mocks = [
            {
                delay: Infinity, // to prevent React from batching the loading state away
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
                                },
                            ],
                            hasMore: false,
                            cursor: ''
                        }
                    }
                }
            }
        ];

        render(<MockedProvider mocks={mocks} addTypename={false} ><Feed /></MockedProvider>);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test("should show error UI", async () => {
        const errorMock = {
            request: {
                query: GET_LAUNCHES,
                variables: {
                    pageSize: 5
                }
            },
            error: new Error("An error occurred")
        };
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Feed />
            </MockedProvider>
        );
        expect(await screen.findByText("Error : An error occurred")).toBeInTheDocument();
    });

    test("renders component with valid data", async () => {
        const mocks = [
            {
                delay: 5, // to prevent React from batching the loading state away
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
                                },
                            ],
                            hasMore: false,
                            cursor: ''
                        }
                    }
                }
            }
        ];

        render(<MockedProvider mocks={mocks} addTypename={false} ><Feed /></MockedProvider>);
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Launches")).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toHaveTextContent('ID: 1');

        expect(screen.getByTestId('launch-item-field-mission-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-1')).toHaveTextContent('mission 1');

        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toHaveTextContent('Rocket: rocket 1 (type 1)');

        expect(screen.getByTestId('launch-item-field-site-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-1')).toHaveTextContent('Site: site 1');
    });

    test("renders on fetchMore", async () => {
        const mocks = [
            {
                delay: 5, // to prevent React from batching the loading state away
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
                                },
                            ],
                            hasMore: true,
                            cursor: ''
                        }
                    }
                }
            },
            {
                delay: 5, // to prevent React from batching the loading state away
                request: {
                    query: GET_LAUNCHES,
                    variables: {
                        pageSize: 5,
                        after: ''
                    }
                },
                result: {
                    data: {
                        launches: {
                            launches: [
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
                                },
                            ],
                            hasMore: false,
                            cursor: ''
                        }
                    }
                }
            }
        ];

        render(<MockedProvider mocks={mocks} addTypename={false} ><Feed /></MockedProvider>);
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Launches")).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toHaveTextContent('ID: 1');

        expect(screen.getByTestId('launch-item-field-mission-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-1')).toHaveTextContent('mission 1');

        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toHaveTextContent('Rocket: rocket 1 (type 1)');

        expect(screen.getByTestId('launch-item-field-site-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-1')).toHaveTextContent('Site: site 1');

        // scroll page initial setup
        window.scrollTo = vi.fn();
        Object.defineProperty(document.documentElement, 'clientHeight', {
            writable: true,
            configurable: true,
            value: 95,
        });
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 200,
        });
        scroll(0, 100); // scroll to top
        scroll(200, 100); // scroll to bottom

        //show second item
        //data for id 2
        expect(await screen.findByText("ID: 2")).toBeInTheDocument();

        expect(screen.getByTestId('launch-item-field-mission-name-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-2')).toHaveTextContent('mission 2');

        expect(screen.getByTestId('launch-item-field-rocket-description-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-2')).toHaveTextContent('Rocket: rocket 2 (type 2)');

        expect(screen.getByTestId('launch-item-field-site-name-2')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-2')).toHaveTextContent('Site: site 2');
    });

    test("renders on fetchMore with error", async () => {
        const mocks = [
            {
                delay: 5, // to prevent React from batching the loading state away
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
                                },
                            ],
                            hasMore: true,
                            cursor: ''
                        }
                    }
                }
            },
            {
                request: {
                    query: GET_LAUNCHES,
                    variables: {
                        pageSize: 5,
                        after: ''
                    }
                },
                error: new Error("An error occurred")
            }
        ];

        render(<MockedProvider mocks={mocks} addTypename={false} ><Feed /></MockedProvider>);
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Launches")).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-id-1')).toHaveTextContent('ID: 1');

        expect(screen.getByTestId('launch-item-field-mission-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-mission-name-1')).toHaveTextContent('mission 1');

        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-rocket-description-1')).toHaveTextContent('Rocket: rocket 1 (type 1)');

        expect(screen.getByTestId('launch-item-field-site-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('launch-item-field-site-name-1')).toHaveTextContent('Site: site 1');

        // scroll page initial setup
        window.scrollTo = vi.fn();
        Object.defineProperty(document.documentElement, 'clientHeight', {
            writable: true,
            configurable: true,
            value: 95,
        });
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 200,
        });
        scroll(0, 100); // scroll to top
        scroll(200, 100); // scroll to bottom

        //fails with error
        expect(await screen.findByText("Error fetching more launches: An error occurred")).toBeInTheDocument();
    });
});