import { invite } from "Action/ApiCall/user-api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ModalInvite.css";

function ModalInvite(props) {
  const [email, setEmail] = useState("");
  const { id } = useParams();

  const handleClose = () => {
    props.setClose(<></>);
  };

  const handleOnInvite = async (e) => {
    e.preventDefault();

    try {
      const response = await invite(id, { email });
      alert("Đã mời thành công!");
      handleClose();
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <div className="Modal">
      <div className="Modal-content">
        <h4 style={{ textAlign: "center" }}>Mời bạn bè</h4>

        <form action="" onSubmit={handleOnInvite}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn-form">Mời</button>
        </form>
      </div>
      <div className="Modal-backdrop" onClick={handleClose}></div>
    </div>
  );
}

export default ModalInvite;
