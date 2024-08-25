import { ApolloError } from "@apollo/client";
import { Launch, LaunchConnection, Maybe } from "../graphql/graphql";
import LaunchComponent from "./Launch"
import { ErrorComponent } from "./Error";

interface ILaunches {
    launches: LaunchConnection;
    error?: ApolloError;
}

export const Launches = ({ launches, error }: ILaunches) => {
    return (
        <div>
            <h1>Launches</h1>
            <ul className="launches-container">
                {launches?.launches.length && launches.launches.map((launch: Maybe<Launch>) => {
                    return launch?.id ? (<LaunchComponent key={launch.id} {...launch} />) : <>No launches found</>
                })
                }
            </ul>
            {error && <ErrorComponent error={error} />}
        </div>
    );
};