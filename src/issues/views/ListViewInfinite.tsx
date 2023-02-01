import { useState } from 'react';

import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks';


export const ListViewInfinite = () => {

  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabel });

  const onLabelChanged = ( labelName: string ) => {
    ( selectedLabel.includes( labelName ) ) 
      ? setSelectedLabel( selectedLabel.filter( label => label !== labelName ) )
      : setSelectedLabel([ ...selectedLabel, labelName ]);
  }


  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? ( <LoadingIcon /> )
            : ( 
               <IssueList 
                issues={ issuesQuery.data?.pages.flat() || [] } 
                state= { state }
                onStateChanged={ ( newState ) => setState( newState )}
               /> 
               )
        }

        <button 
          className='btn btn-outline-primary mt-2'
          disabled={ !issuesQuery.hasNextPage }
          onClick={ () => issuesQuery.fetchNextPage() }
        >
          Load More...
        </button>

      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={ selectedLabel }
          onChange={ (labelName) => onLabelChanged(labelName) }
        />
      </div>
    </div>
  )
}
