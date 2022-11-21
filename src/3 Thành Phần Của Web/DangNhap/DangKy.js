import { dangKy } from "Action/ApiCall/user-api";
import { useState } from "react";
import "./Form.css";

function DangKy(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dangKy({ fullName, email, password });
      alert("Đăng ký thành công!");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <>
      <div className="Form">
        <div className="contain-form">
          <h2 style={{ textAlign: "center" }}>Đăng ký</h2>
          <div className="login-form">
            <form action="" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="fName">Họ tên</label>
                <input
                  type="text"
                  id="fName"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="un">Email</label>
                <input
                  type="email"
                  id="un"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pw">Mật khẩu</label>
                <input
                  type="password"
                  id="pw"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="repw">Nhập lại mật khẩu</label>
                <input type="password" id="repw" />
              </div>
              <button type="submit" className="btn-form">
                Đăng Ký
              </button>
              <a href="/">Đăng nhập</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DangKy;
