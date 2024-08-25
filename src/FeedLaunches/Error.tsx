//display Error component if error is present

import { ApolloError } from "@apollo/client";

export const ErrorComponent: React.FC<{ error: ApolloError }> = ({ error }) => {
    return <p key={"error-msg"}>Error : {error.message}</p>;
};