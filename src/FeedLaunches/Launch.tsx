import { ILaunch } from "../data/types";

const Launch = (entry: ILaunch) => (
    <li key={`launch-item-li-${entry.id}`} className="launch-item">
        <p
            id={`launch-item-id-${entry.id}`}
            data-testid={`launch-item-id-${entry.id}`}
        >
            ID: {entry.id}
        </p>
        <h2
            id="launch-item-field-mission-name"
            data-testid={`launch-item-field-mission-name-${entry.id}`}
        >
            {entry.mission.name}
        </h2>
        <p
            id="launch-item-field-rocket-description"
            data-testid={`launch-item-field-rocket-description-${entry.id}`}
        >
            Rocket: {entry.rocket.name} ({entry.rocket.type})
        </p>
        <p
            id="launch-item-field-site-name"
            data-testid={`launch-item-field-site-name-${entry.id}`}
        >
            Site: {entry.site}
        </p>
    </li>
)

export default Launch;