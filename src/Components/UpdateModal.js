import { useEffect, useRef } from "react";
import './UpdateModal.css'

function UpdateModal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <div className="updateBoc">
        <dialog className="test"
      ref={ref}
      onCancel={closeModal}
    >
      {children}
      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
    </div>

  );
}

export default UpdateModal;
