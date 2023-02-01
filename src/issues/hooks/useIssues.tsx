import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/gitHubApi';
import { sleeep } from '../../helpers/sleep';
import { Issue, State } from '../interfaces';


interface Props {
  state?: State;
  labels: string[];
  page?: number
}

const getIssues = async( {labels, state, page = 1 }: Props): Promise<Issue[]> =>{

  await sleeep(2);

  const params = new URLSearchParams();

  if ( state ) params.append('state', state);

  if ( labels.length > 0 ) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');


    const { data } = await gitHubApi.get<Issue[]>('/issues', { params });
    // console.log(data);
    return data;
}


export const useIssues = ({ state, labels }: Props ) => {

    const [page, setPage] = useState(1);

    useEffect(() => {
      setPage(1)
    }, [state, labels])
    

    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, state, page }),
        // {
        //     refetchInterval
        // }
    );

    const nextPage = () => {
      if ( issuesQuery.data?.length === 0 ) return;

      setPage( page + 1 );
    }

    const prevPage = () => {
      if ( page > 1 )setPage( page - 1 );
    }

  return {
    // Properties
    issuesQuery,


    // Getter
    page: issuesQuery.isFetching ? 'loading' : page,


    // Method
    nextPage,
    prevPage
  }
}
