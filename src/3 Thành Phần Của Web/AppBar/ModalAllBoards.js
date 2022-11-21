import { useEffect } from "react";
import { useState } from "react";
import "./ModalAllBoards.css";

function ModalAllBoards(props) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("me"));
    setBoards([{ _id: me.boardOwner, title: "My Board" }, ...me.boards]);
  }, []);

  const handleClose = () => {
    props.setClose(<></>);
  };

  return (
    <div className="Modal">
      <div className="ModalAllBoards Modal-content">
        <h4 style={{ textAlign: "center" }}>Tất cả boards</h4>
        <div className="contain-boards">
          {boards.map((b) => (
            <div
              key={b._id}
              className="boards"
              onClick={() => (window.location.href = "/" + b._id)}
            >
              {b.title}
            </div>
          ))}
        </div>
      </div>
      <div className="Modal-backdrop" onClick={handleClose}></div>
    </div>
  );
}

export default ModalAllBoards;
