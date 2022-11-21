import React, { useState } from "react";
import { Container as BootstapContainer, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./BoardBar.scss";
import ModalInvite from "./ModalInvite";

function BoardBar() {
  const { id } = useParams();
  const [replaceModal, setReplaceModal] = useState(<></>);

  const openModalInvite = () => {
    setReplaceModal(<ModalInvite setClose={setReplaceModal} />);
  };

  return (
    <>
      <nav className="navbar-board">
        <BootstapContainer className="Huuquy-trello-container">
          <Row>
            <Col sm={10} xs={12} className="col-no-padding">
              <div className="board-info">
                <div className="item board-logo-icon">
                  {" "}
                  <i className="fa fa-coffee" /> &nbsp;&nbsp;
                  <strong>HuuQuy trello</strong>
                </div>
                <div className="divider"></div>
                <div className="item board-type"> Private Workspace</div>
                <div className="divider"></div>

                <div className="item member-avatar">
                  <img
                    src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/95772708_700541884110713_5499129126247727104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YHQuR6EWqeoAX-yZqJ0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQuV5PbwHfK3aM83M6cCXSpUqWqHvtVkvje--wpaafniA&oe=638DFD90"
                    alt="avatar-huuquy"
                    title="HuuQuy"
                  />
                  {/* <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/95772708_700541884110713_5499129126247727104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YHQuR6EWqeoAX-yZqJ0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQuV5PbwHfK3aM83M6cCXSpUqWqHvtVkvje--wpaafniA&oe=638DFD90' alt='avatar-huuquy' title='HuuQuy'/> */}
                  {/* <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/95772708_700541884110713_5499129126247727104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YHQuR6EWqeoAX-yZqJ0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQuV5PbwHfK3aM83M6cCXSpUqWqHvtVkvje--wpaafniA&oe=638DFD90' alt='avatar-huuquy' title='HuuQuy'/> */}
                  <span className="more-member">+</span>
                  <span className="invite" onClick={openModalInvite}>
                    Invite
                  </span>
                </div>
              </div>
            </Col>

            <Col sm={2} xs={12} className="col-no-padding">
              <div className="board-actions">
                <div className="item menu">
                  {" "}
                  <i className="fa fa-ellipsis-h mr-2" /> Show Menu{" "}
                </div>
              </div>
            </Col>
          </Row>
        </BootstapContainer>
      </nav>

      {replaceModal}
    </>
  );
}

export default BoardBar;
