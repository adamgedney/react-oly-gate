import _ from 'underscore';

import {
	LINK_CHANGE
} from './constants';

const initialState = [];

export default function centralizer(state = initialState, action) {
	let _state = [...state],
		_data = Object.assign({},action.data);

	switch (action.type){
		case LINK_CHANGE:

			// use spread to enforce immutability
			return [...collections.replaceItem(_state,_data,'id')];
			break;
		default:
			return state;
	}
}