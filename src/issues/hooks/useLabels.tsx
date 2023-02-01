import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/gitHubApi';
import { sleeep } from '../../helpers/sleep';
import { Label } from '../interfaces/label';

const getLabels = async(): Promise<Label[]> => {

    await sleeep(2);

    const { data } = await gitHubApi.get<Label[]>('/labels?per_page=100', {
      headers:{
        Authorization: null
      }
    });
    
     return data;
    
  }

export const useLabels = () => {

    
  const labelsQuery = useQuery(
    ['labels'],
    getLabels,
    {
    //   refetchOnWindowFocus: false
        staleTime: 1000 * 60 * 60 ,
      //   initialData: [{
      //     id: 69105383,
      //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
      //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
      //     name: "Browser: IE",
      //     color: "c7def8",
      //     default: false
      //   },
      //   {
      //     id: 717031390,
      //     node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
      //     url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
      //     name: "good first issue",
      //     color: "6ce26a",
      //     default: true
      //   }
      // ],
        placeholderData: [{
          id: 69105383,
          node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
          url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
          name: "Browser: IE",
          color: "c7def8",
          default: false
        },
        {
          id: 717031390,
          node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
          name: "good first issue",
          color: "6ce26a",
          default: true
        }
      ]
    }
  );


    return labelsQuery;
}