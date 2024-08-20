import { ILaunch } from "../data/types";
import Launch from "./Launch";

export interface ILaunches {
    entries: ILaunch[];
}

export const Launches = ({ entries }: ILaunches) => {
    return (
        <div>
            <h1>Launches</h1>
            <ul className="launches-container">
                {entries.map((entry: ILaunch) => <Launch key={entry.id} {...entry} />)}
            </ul>
        </div>
    );
};