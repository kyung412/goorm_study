
/* eslint-disable react/prop-types */
import { useState } from 'react';

const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li>
      {/* 체크박스 */}
      <input
        type="checkbox"
        checked={todo.completed} 
        onChange={() => toggleComplete(todo.id)} 
      />

      {/* 수정 상태이면 input을 보여주고, 아니라면 span을 보여줘 */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
      )}

      {/* 수정여부 버튼: 수정 상태이면 해당 버튼에 '등록'으로, 아니라면 '수정'으로 써 줘 */}
      <button onClick={handleEdit}>
        {isEditing ? '등록' : '수정'}
      </button>

      {/* 삭제버튼 */}
      <button onClick={() => deleteTodo(todo.id)}>
        삭제
      </button>
    </li>
  );
};

export default TodoItem;