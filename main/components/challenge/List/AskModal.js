import React from "react";

const AskModal = ({
  visible,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  const onCancel = (e) => {};
  const onConfirm = (e) => {};
  if (!visible) return null;
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="buttons">
        <button onClick={onCancel}>{cancelText}</button>
        <button cyan onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </>
  );
};

export default AskModal;
