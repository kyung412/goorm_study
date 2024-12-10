
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css"; 
import { Checkbox } from "antd";
import { setTwoToneColor, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';


/**
 * TodoItem 컴포넌트
 * - 개별 할 일을 렌더링하고 수정, 완료 상태 변경, 삭제 기능을 제공
 */
const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => { 
  const [isEditing, setIsEditing] = useState(false);    //현재 수정 중인지 여부
  const [editText, setEditText] = useState(todo.text);  //수정 중인 텍스트 상태

  /**
   * 수정 동작을 처리하는 함수
   * - "등록" 버튼을 누르면 수정 내용을 저장(updateTodo 호출)
   * - 수정 상태를 토글(isEditing을 전환)
   */
  const handleEdit = () => {               
    if (isEditing && editText.trim()) { //수정 중이며 입력값이 유효한 경우
      updateTodo(todo.id, editText);    //부모 컴포넌트의 updateTodo 호출
    }
    setIsEditing(!isEditing);           //수정 상태 전환
  };

  /**
   * 엔터 키를 통해 수정 완료
   * - 텍스트 입력 중 Enter 키를 누르면 수정 내용을 저장
   * - 수정 상태를 종료
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editText.trim()) {
      updateTodo(todo.id, editText); //수정 사항 저장
      setIsEditing(false);//수정 상태 종료
    }
  }

  setTwoToneColor('#747bff');
  return (
    <li className={style.li}>
      {/* 체크박스 : 완료 상태를 토글 */}
      <Checkbox
        checked={todo.completed} // 완료야부 업데이트(상태값 반영)
        onChange={() => toggleComplete(todo.id)} // 완료 상태 변경 함수 호출
      />
  
      {/* 수정 중인 상태 */}
      {isEditing ? (
        <div className={style.content}>
          <input
            type="text"
            value={editText} // 수정 중인 텍스트 상태
            onChange={(e) => setEditText(e.target.value)} // 입력값 변경 시 상태 업데이트
            onKeyDown={handleKeyDown}//엔터 키 처리
          />
          <button onClick={handleEdit}>
            <EditTwoTone />
          </button>
          <button onClick={() => deleteTodo(todo.id)}>
            <DeleteTwoTone/>
          </button>
        </div>
      ) : (
        <div className={style.content}>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </span>
  
          <div className={style.rightSection}>
            <small className={style.time}>{todo.time}</small>
            <div className={style.buttons}>
              <button onClick={handleEdit}>
              <EditTwoTone/>
              </button>
              <button onClick={() => deleteTodo(todo.id)}>
                <DeleteTwoTone/>
              </button>
            
            </div>
          </div>
        </div>
      )}
    </li>
  );
};  
export default TodoItem;