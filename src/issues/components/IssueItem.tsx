import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { getIssueInfo, getIssueComments } from '../hooks/useIssue';
import { timeSince } from '../../helpers';


interface Props {
    issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {

    const navigate = useNavigate();

    const querclient = useQueryClient();

    const prefetchData = () => {
        querclient.prefetchQuery(
            ["issue",issue.number],
            () => getIssueInfo( issue.number )
        )

        querclient.prefetchQuery(
            ["issue",issue.number,'comments'],
            () => getIssueComments( issue.number )
        )

    }

    const preSetData = () => {

        querclient.setQueryData(
            ["issue",issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        )

    }


    return (
        <div className="card mb-2 issue"
            onClick={ () => navigate(`/issues/issue/${ issue.number }`)}
            // onMouseEnter={ prefetchData }
            onMouseEnter={ preSetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Closed
                     ? (<FiCheckCircle size={30} color="green" />)
                     :  (<FiInfo size={30} color="red" />)
                }
                

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{ issue.number } opened { timeSince( issue.created_at ) }  ago by <span className='fw-bold'>{ issue.user.login }</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span
                                    key={ label.id }
                                    className="badge rounded-pill m-1"
                                    style={{ backgroundColor: `#${ label.color }`, color: 'black' }}
                                >
                                    { label.name }
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
