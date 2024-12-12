import { useReducer, useEffect, useCallback } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import styles from "./css/App.module.css";
import { SearchOutlined } from '@ant-design/icons';
//useReducer
const todoReducer = (state, action) => {
  const dayOption = {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  switch (action.type) {
    case 'ADD_TODO': // 새 할 일 추가
      return { ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            time: new Date().toLocaleString('ko-KR', dayOption),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case 'UPDATE_TODO': // 특정 할 일 텍스트 수정
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, time: new Date().toLocaleString('ko-KR', dayOption) }
            : todo
        ),
      };

    case 'TOGGLE_COMPLETE': // 완료 여부 수정
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO': // 삭제
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'SET_SEARCH_QUERY': // 검색어 설정
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

function App() {
  const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    searchQuery: '',
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = useCallback((text) => dispatch({ type: 'ADD_TODO', payload: text }), []);
  const updateTodo = useCallback((id, text) => dispatch({ type: 'UPDATE_TODO', payload: { id, text } }), []);
  const toggleComplete = useCallback((id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id }), []);
  const deleteTodo = useCallback((id) => dispatch({ type: 'DELETE_TODO', payload: id }), []);
  const setSearchQuery = useCallback((query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }), []);

  const filteredTodos = state.searchQuery
    ? state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    : state.todos;

  return (
    <div className={styles.app}>
      <h1>Daily Task</h1>
      <TodoInput addTodo={addTodo} />

      <div className={styles.searchInput}>
      <SearchOutlined className={styles.ico} />
        <input
          type="search"
          placeholder="할 일을 검색하세요"
          value={state.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TodoList
        todos={filteredTodos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
