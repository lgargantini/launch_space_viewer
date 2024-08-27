import { Launch, Maybe } from "../graphql/graphql";

const LaunchComponent = (entry: Maybe<Launch>) => (
    <li id={`launch-item-li-${entry?.id ?? 'unknown'}`} className="launch-item">
        <p
            id={`launch-item-id-${entry?.id ?? 'unknown'}`}
            data-testid={`launch-item-id-${entry?.id ?? 'unknown'}`}
        >
            ID: {entry?.id ?? 'unknown'}
        </p>
        <h2
            id="launch-item-field-mission-name"
            data-testid={`launch-item-field-mission-name-${entry?.id ?? 'unknown'}`}
        >
            {entry?.mission?.name}
        </h2>
        <p
            id="launch-item-field-rocket-description"
            data-testid={`launch-item-field-rocket-description-${entry?.id ?? 'unknown'}`}
        >
            Rocket: {entry?.rocket?.name} ({entry?.rocket?.type})
        </p>
        <p
            id="launch-item-field-site-name"
            data-testid={`launch-item-field-site-name-${entry?.id ?? 'unknown'}`}
        >
            Site: {entry?.site}
        </p>
    </li>
)

export default LaunchComponent;