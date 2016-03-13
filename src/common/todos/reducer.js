import * as actions from './actions';
import Todo from './todo';
import { Map, Record } from 'immutable';

const InitialState = Record({
    map: new Map()
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ map }) => initialState.merge({
    map: new Map(map).map(todo => new Todo(todo))
});

export default function todosReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return revive(state);

    switch (action.type) {
    case actions.ADD_HUNDRED_TODOS: {
        const todos = action.payload.reduce((t, json) =>
            t.set(json._id, new Todo(json)), new Map());
        return state.update('map', map => map.merge(todos));
    }

    case actions.ADD_TODO: {
        const todo = new Todo(action.payload);
        return state
            .update('map', map => map.set(todo._id, todo));
    }

    case actions.CLEAR_ALL_COMPLETED_TODOS: {
        return state
            .update('map', map => map.filterNot(todo => todo.completed));
    }

    case actions.CLEAR_ALL_TODOS: {
        return state.update('map', map => map.clear());
    }

    case actions.DELETE_TODO: {
        const {
            id
        } = action.payload;
        return state.update('map', map => map.delete(id));
    }

    case actions.FETCH_USER_TODOS_SUCCESS: {
        const todos = new Map(action.payload.todos).map(todo => new Todo(todo));
        return state.update('map', map => map.merge(todos));
    }

    case actions.TOGGLE_TODO_COMPLETED: {
        const {
            todo
        } = action.payload;
        return state
            .updateIn(['map', todo._id, 'completed'], completed => !completed);
    }

    }

    return state;
}
