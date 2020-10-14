import {useDispatch, useSelector} from 'react-redux'; 
import {setExample} from './redux/actions';

const SampleReduxUsage = (props) => {
   const example = useSelector(state => state.example)
   const dispatch = useDispatch();

   dipatch(setExample({data: 'sample data here'}))

   return (<div></div>)
}

export default SampleReduxUsage