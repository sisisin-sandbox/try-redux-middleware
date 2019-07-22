import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const hogeMiddleware = () => next => action => {
  console.log('hoge middleware: ', action);
  return next(action);
};

function counter(state = 0, action) {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
}

const storeApplyThunkFirst = createStore(counter, applyMiddleware(thunk, hogeMiddleware));
const storeApplyThunkLast = createStore(counter, applyMiddleware(hogeMiddleware, thunk));

function log(store) {
  console.log(store.getState());
  store.dispatch(dispatch => {
    console.log('thunked');
    return dispatch({ type: 'INC' });
  });
  console.log(store.getState());
}

/**
 * logged following list
 * 0
 * thunked
 * hoge hoge middleware: {type: 'INC'}
 * 1
 */
log(storeApplyThunkFirst);

console.log('=================');

/**
 * logged following list
 *
 * 0
 * hoge middleware:  ƒ (dispatch) {
 *   console.log('thunked');
 *   return dispatch({ type: 'INC' });
 * }
 *  thunked
 * hoge middleware:  {type: "INC"}
 * 1
 */
log(storeApplyThunkLast);
