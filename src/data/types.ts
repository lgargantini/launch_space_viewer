export interface ILaunch {
    id: string;
    mission: {
        name: string;
    };
    rocket: {
        name: string;
        type: string;
    };
    site: string;
};

export interface ILaunchConnection {
    cursor: string;
    hasMore: boolean;
    launches: ILaunch[];
}

export interface ILaunchRef {
    __ref: string;
}