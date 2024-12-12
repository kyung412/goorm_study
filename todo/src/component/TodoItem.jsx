/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css"; 
import { Checkbox, Modal } from "antd";
import { setTwoToneColor, DeleteTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

/**
 * TodoItem 컴포넌트
 * - 개별 할 일을 렌더링하고 수정, 완료 상태 변경, 삭제 기능을 제공
 */
const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // 현재 수정 중인지 여부
  const [editText, setEditText] = useState(todo.text); // 수정 중인 텍스트

  //할일 수정 함수
  const handleEdit = () => {
    if (isEditing && editText.trim()){
      showModal('edit');
  }
  setIsEditing(!isEditing);
  };

  //엔터키 입력 감지
  const handleKeyDown = (e) => {
    if (e.keyCode === 229) return;
    if (e.key === 'Enter') handleEdit();
    };

  setTwoToneColor('#747bff');

  //모달
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부 초기값
  const [mode, setMode] = useState(''); // 모달 종류 초기값 'delete' 또는 'edit'

  
  const showModal = (selectedMode) => {
    setMode(selectedMode); // 모달 종류 설정
    setIsModalOpen(true); // 모달 열기
  };
  
  const handleOk = () => {
    if (mode === 'delete') {
        deleteTodo(todo.id); 
    } else if (mode === 'edit') {
      updateTodo(todo.id, editText); 
    }
      setIsModalOpen(false);
  }; 

  const handleCancel = () => {
    if (mode === 'edit') setEditText(todo.text); // 수정 취소 시 텍스트 복원
    setIsModalOpen(false); // 모달 닫기
  };
  
  return (
    <li className={style.li}>
      {/* 체크박스 : 완료 상태 토글 */}
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {/* 수정 상태 */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div style={{ textDecoration: todo.completed ? 'line-through' : 'none', }}>
          <span>{todo.text}</span>
          <span>{todo.time}</span>
        </div>
      )}

      {/* 수정 버튼 */}
      {!isEditing && (
        <button type='button' onClick = {handleEdit}>
        {isEditing ? <CheckCircleTwoTone /> : <EditTwoTone />}
        </button>
      )}

      {/* 삭제 버튼 */}
      <button onClick={() => showModal('delete')}>
        <DeleteTwoTone />
      </button>

      {/* 모달 */}
      <Modal
        title={mode === 'delete' ? '삭제 확인' : '수정 확인'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
      >
        {mode === 'delete'
          ? `'${todo.text}'를 삭제하시겠습니까?`
          : `'${todo.text}'를 '${editText}'(으)로 수정하시겠습니까?, 작성날짜도 변경됩니다.`}
      </Modal>
    </li>
  );


  };

export default TodoItem;
