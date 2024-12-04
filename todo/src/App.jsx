import { useState, useEffect } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import styles from "./css/App.module.css";

function App() {
  

/**
 * R (읽기) - 로컬 스토리지에서 저장된 할 일 목록 읽어오기
 * 초기 상태를 로컬 스토리지에서 가져오거나, 없으면 빈 배열로 초기화
 */

  //1. 로컬 스토리지에서 데이터 읽기(useState)
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos"); //로컬스토리지에서 todos 데이터 읽어옴
    return storedTodos ? JSON.parse(storedTodos) : []; //문자열로 저장된 데이터를 객체(배열)로 변환
  });

  //2. 로컬 스토리지에 데이터 저장(useEffect)
  //todos 상태가 변경될 때 마다 실행되어 로컬 스토리지에 상태 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    //"todos" 상태를 JSON 문자열로 변환하여 로컬 스토리지에 저장
  }, [todos]);//todos 상태가 변경될 때 마다 실행


    /**
   * C (생성) - todo 등록
   */
  const addTodo = (text) => { //새로운 todos 상태에 추가
    setTodos([...todos, {     //기본 todos 배열에 새 할일 추가하여 상태 업데이트 
      id: Date.now(),    //고유 id 생성(현재 시각의 ms값을 이용)
      text,              //사용자가 입력한 텍스트
      completed: false   //기본적으로 완료 상태는 false
    }]);
  };

/**
 * U (업데이트)
 */  

  //1. 변경된 텍스트 반영 함수
  const updateTodo = (id, updatedText) => {
    setTodos(
      todos.map((todo) =>
         (todo.id === id 
          ? { ...todo, text: updatedText } //id가 일치하면 텍스트만 업데이트
          : todo)));                       //id가 다르면 기존 todo 유지
      /*
      - todos 배열을 .map()으로 순회하며 id가 일치하는 항목을 찾음
      - 일치하는 항목은 ...todo를 사용해 기존 속성을 복사하고 text 속성만 updatedText로 덮어씌움
      - 결과 배열로 상태를 업데이트하여 UI에 반영
      */
  }; 

  //2. 완료여부를 토글하는 핸들러 함수
  const toggleComplete = (id) => {
    setTodos(todos.map((todo) =>
       (todo.id === id 
        ? { ...todo, completed: !todo.completed } //id가 일치하면 완료 상태를 반전
        : todo)));                                //id가 다르면 기존 todo 유지
        
      /*
      - todos 배열을 .map()으로 순회하며 id가 일치하는 항목을 찾음
      - 일치하는 항목은 ...todo를 사용해 기존 속성을 복사하고 completed 속성만 반전
      - 결과 배열로 상태를 업데이트하여 완료 상태 변경을 반영
      */
  };


/**
   * D(삭제) - 특정 할 일 삭제
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
      /*
      - todos 배열을 .filter()로 순회하며 id가 일치하지 않는 항목만 필터링
      - id가 일치하는 항목을 제외한 새로운 배열 생성
      - 결과 배열로 상태를 업데이트하여 삭제 반영
    */
  };


  return (
    <div className={styles.app}>
      <h1>Daily Task</h1>

      {/* 할 일 추가 입력 컴포넌트 */}
      <TodoInput addTodo={addTodo} />

      {/* 할 일 목록 컴포넌트 */}
      <TodoList
        todos={todos}                   //할 일 목록 데이터 전달
        updateTodo={updateTodo}         //텍스트 수정 함수 전달
        toggleComplete={toggleComplete} //완료 상태 변경 함수 전달
        deleteTodo={deleteTodo}         //삭제 함수 전달
      />
    </div>
  );

}

export default App;
