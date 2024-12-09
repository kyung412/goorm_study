
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css"; 
import { Checkbox } from "antd";
import { DeleteTwoTone, EditTwoTone, setTwoToneColor } from '@ant-design/icons';

/**
 * TodoItem 컴포넌트
 * - 개별 할 일을 렌더링하고 수정, 완료 상태 변경, 삭제 기능을 제공
 * - 등록 시간(time)을 표시
 */
const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => { //수정상태 관리
  const [isEditing, setIsEditing] = useState(false);    //현재 수정 중인지 여부
  const [editText, setEditText] = useState(todo.text);  //수정 중인 텍스트 상태

  /**
   * 수정 동작을 처리하는 함수
   * - 수정 중인 상태에서 "등록" 버튼을 누르면 updateTodo 호출
   * - 수정 상태를 토글하여 "수정"과 "등록" 모드 전환
   */
  const handleEdit = () => {               
    if (isEditing && editText.trim()) { //수정 중이며 입력값이 유효한 경우
      updateTodo(todo.id, editText);    //부모 컴포넌트의 updateTodo 호출
    }
    setIsEditing(!isEditing);           //수정 상태 토글
  };

  setTwoToneColor('#747bff')
  return (
    <li className={style.li}>
      {/* 체크박스 : 완료 상태를 토글 */}
      <Checkbox
        checked={todo.completed} // 완료 상태 반영
        onChange={() => toggleComplete(todo.id)} // 클릭 시 완료 상태 반영
      />
  
      {/* 텍스트와 등록 시간 */}
      {isEditing ? (
        <div className={style.content}>
          <input
            type="text"
            value={editText} // 수정 중인 텍스트 상태
            onChange={(e) => setEditText(e.target.value)} // 입력값 변경 시 상태 업데이트
          />
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
                {isEditing ? '등록': <EditTwoTone/>}
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