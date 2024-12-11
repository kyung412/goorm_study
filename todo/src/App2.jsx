import { useReducer, useEffect, useCallback } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import styles from "./css/App.module.css";

//useReducer
const todoReducer = (state, action) => {

  const dayOption = { 
    month: '2-digit',
    day : '2-digit',
    weekday : "short",
    hour : '2-digit',
    minute: '2-digit',
    hour12: false 
  };
  
  //action객체의 type값을 감지하여 상태 변경 처리
  switch (action.type) {

    case 'ADD_TODO':  //새 할일 추가
      return [...state, {
        id: Date.now(),
        time: new Date().toLocaleString('ko-KR', dayOption),
        text: action.payload,
        completed: false
      }];

    case 'UPDATE_TODO': //특정 할일 텍스트 수정
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, time: new Date().toLocaleString('ko-KR', dayOption) }
          : todo
      );
    
    case 'TOGGLE_COMPLETE': // 완료여부 수정
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':    // 삭제
      return state.filter(todo => todo.id !== action.payload);

    case 'SET_SEARCH_QUERY': // 검색어 설정
      return {
        ...state,
        searchQuery: action.payload,
      };
  
    default: // 정의되지 않은 액션은 기존 상태 반환
      return state;
  }
};

function App() {

 // 초기 상태 정의
  const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  searchQuery: "",
};

// useReducer를 사용하여 상태 관리
const [state, dispatch] = useReducer(todoReducer, initialState);

// todos 상태가 변경될 때마다 로컬 스토리지에 저장
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}, [state.todos]);

// CRUD 함수 정의(dispatch를 통해 상태 변경 요청)
const addTodo = useCallback((text) => dispatch({ type: 'ADD_TODO', payload: text }), []);
const updateTodo = useCallback((id, text) => dispatch({ type: 'UPDATE_TODO', payload: { id, text } }), []);
const toggleComplete = useCallback((id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id }), []);
const deleteTodo = useCallback((id) => dispatch({ type: 'DELETE_TODO', payload: id }), []);
const setSearchQuery = useCallback((query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }), []);

// 검색 결과 필터링
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