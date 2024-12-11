/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css"; 
import { Checkbox, Modal } from "antd";
import { setTwoToneColor, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

/**
 * TodoItem 컴포넌트
 * - 개별 할 일을 렌더링하고 수정, 완료 상태 변경, 삭제 기능을 제공
 */
const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // 현재 수정 중인지 여부
  const [editText, setEditText] = useState(todo.text); // 수정 중인 텍스트
  const [modalState, setModalState] = useState({ open: false, mode: '' }); // 모달 상태 관리

  /**
   * 수정 상태 전환 함수
   */
  const handleEditToggle = () => {
    if (isEditing && editText.trim()) {
      updateTodo(todo.id, editText); // 수정 사항 저장
    }
    setIsEditing(!isEditing); // 수정 상태 반전
  };

  /**
   * 엔터 키를 통해 수정 완료
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editText.trim()) {
      updateTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  /**
   * 모달 열기
   */
  const showModal = (mode) => {
    setModalState({ open: true, mode });
  };

  /**
   * 모달 확인
   */
  const handleModalOk = () => {
    if (modalState.mode === 'delete') {
      deleteTodo(todo.id);
    } else if (modalState.mode === 'edit' && editText.trim()) {
      updateTodo(todo.id, editText);
    }
    setModalState({ open: false, mode: '' }); // 모달 닫기
  };

  /**
   * 모달 취소
   */
  const handleModalCancel = () => {
    if (modalState.mode === 'edit') {
      setEditText(todo.text); // 수정 취소 시 텍스트 복원
    }
    setModalState({ open: false, mode: '' });
  };

  setTwoToneColor('#747bff');

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
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
      )}

      {/* 수정 버튼 */}
      <button onClick={() => (isEditing ? handleEditToggle() : showModal('edit'))}>
        <EditTwoTone />
      </button>

      {/* 삭제 버튼 */}
      <button onClick={() => showModal('delete')}>
        <DeleteTwoTone />
      </button>

      {/* 모달 */}
      <Modal
        title={modalState.mode === 'delete' ? '삭제 확인' : '수정 확인'}
        open={modalState.open}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="확인"
        cancelText="취소"
      >
        {modalState.mode === 'delete'
          ? `'${todo.text}'를 삭제하시겠습니까?`
          : `'${todo.text}'를 '${editText}'로 수정하시겠습니까?`}
      </Modal>
    </li>
  );
};

export default TodoItem;
