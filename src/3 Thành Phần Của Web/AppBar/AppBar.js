import React from "react";
import "./AppBar.scss";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ModalAllBoards from "./ModalAllBoards";
import { useState } from "react";

function AppBar() {
  const [replaceModal, setReplaceModal] = useState(<></>);
  const showAllBoards = () => {
    setReplaceModal(<ModalAllBoards setClose={setReplaceModal} />);
  };

  return (
    <>
      <nav className="navbar-app">
        <BootstrapContainer className="huuquy-trello-container">
          <Row>
            <Col sm={5} xs={12} className="col-no-padding">
              <div className="app-actions">
                <div className="item all" onClick={showAllBoards}>
                  {" "}
                  <i className="fa fa-th" />{" "}
                </div>
                <div className="item home">
                  {" "}
                  <i className="fa fa-home" />{" "}
                </div>
                <div className="item boards">
                  {" "}
                  <i className="fa fa-columns" />{" "}
                </div>
                <div className="item search">
                  <InputGroup className="group-search">
                    <FormControl
                      className="input-search"
                      placeholder="Jump to ..."
                    />
                    <InputGroup.Text className="input-icon-search">
                      {" "}
                      <i className="fa fa-search" />{" "}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </Col>

            <Col sm={2} xs={12} className="col-no-padding">
              <div className="app-branding text-center">
                <a
                  href="C:\Users\nguyen huu quy\huuquy-app\public\images"
                  target="blank"
                >
                  <img
                    src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/95772708_700541884110713_5499129126247727104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YHQuR6EWqeoAX-yZqJ0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQuV5PbwHfK3aM83M6cCXSpUqWqHvtVkvje--wpaafniA&oe=638DFD90"
                    className="top-logo"
                    alt="huuquy-logo"
                  />
                  <span className="huuquy-slogan">HuuQuy-Trello</span>
                </a>
              </div>
            </Col>

            <Col sm={5} xs={12} className="col-no-padding">
              <div className="user-actions">
                <div className="item quick">
                  {" "}
                  <i className="fa fa-plus-square-o" />{" "}
                </div>
                <div className="item news">
                  {" "}
                  <i className="fa fa-info-circle" />{" "}
                </div>
                <div className="item notification">
                  {" "}
                  <i className="fa fa-bell-o" />{" "}
                </div>
                <div className="item user-avatar">
                  <img
                    src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/95772708_700541884110713_5499129126247727104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YHQuR6EWqeoAX-yZqJ0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQuV5PbwHfK3aM83M6cCXSpUqWqHvtVkvje--wpaafniA&oe=638DFD90"
                    alt="avatar-huuquy"
                    title="HuuQuy"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </BootstrapContainer>
      </nav>
      {replaceModal}
    </>
  );
}

export default AppBar;
