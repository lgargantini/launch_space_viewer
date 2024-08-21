import { Launch, LaunchConnection, Maybe } from "../graphql/graphql";
import LaunchComponent from "./Launch"

export const Launches = (launches: LaunchConnection) => {
    return (
        <div>
            <h1>Launches</h1>
            <ul className="launches-container">
                {launches?.launches.length && launches.launches.map((launch: Maybe<Launch>) => {
                    return (<LaunchComponent key={launch?.id} {...launch} />)
                })
                }
            </ul>
        </div>
    );
};