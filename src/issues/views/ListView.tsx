import { useState } from 'react';

import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

import { useIssues } from '../hooks';
import { State } from '../interfaces';


export const ListView = () => {

  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery, page, prevPage, nextPage } = useIssues({ state, labels: selectedLabel });

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
                issues={ issuesQuery.data || [] } 
                state= { state }
                onStateChanged={ ( newState ) => setState( newState )}
               /> 
               )
        }

        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button 
            className='btn btn-outline-primary'
            disabled={ issuesQuery.isFetching }
            onClick={ prevPage }
          >Prev</button>

          <span> { page } </span>

          <button 
            className='btn btn-outline-primary'
            disabled={ issuesQuery.isFetching }
            onClick={ nextPage }
          >Next</button>
        </div>
       
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
