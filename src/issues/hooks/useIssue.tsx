import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../../api/gitHubApi";
import { sleeep } from "../../helpers/sleep";
import { Issue } from "../interfaces";


export const getIssueInfo = async( issueNumber: number ): Promise<Issue> =>{
    await sleeep(2);
    const { data } = await gitHubApi.get<Issue>(`/issues/${ issueNumber }`);

    // console.log(data);
    return data;

}

export const getIssueComments = async( issueNumber: number ): Promise<Issue[]> =>{
    await sleeep(2);
    const { data } = await gitHubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`);

    // console.log(data);
    return data;

}

export const useIssue = ( issueNumber: number ) => {

  const issueQuery =  useQuery(
    [ 'issue', issueNumber ],
    () => getIssueInfo( issueNumber ),
  );

  const commentsQuery =  useQuery(
    [ 'issue', issueNumber, 'comments' ],
    () => getIssueComments( issueQuery.data!.number ),
    {
        enabled: issueQuery.data !== undefined
    }
  );

  return {
    issueQuery,
    commentsQuery
  }
}
