import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty, cloneDeep } from "lodash"; // thư viện lodash npm: https://www.npmjs.com/package/lodash
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap"; // add thư viện boottrap
import "./BoardContent.scss";
import Column from "3 Thành Phần Của Web/Column/Column";
import { mapOrder } from "Chức năng/Sắp xếp"; // gọi thư viện sắp xếp
import { applyDrag } from "Chức năng/dragDrop";
// import { initialData } from 'Action/initialData'//gọi thư viện database
import {
  fetchBoardDetails,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard,
} from "Action/ApiCall";
import { useParams } from "react-router-dom";

function BoardContent() {
  const [board, setBoard] = useState({}); //react hook
  const [columns, setcolumns] = useState([]);
  const newColumnInputRef = useRef(null);
  const [newColumnTitle, setnewColumnTitle] = useState("");
  const onNewColumnTileChange = (e) => setnewColumnTitle(e.target.value);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const { id } = useParams();
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const onColumnDrop = (dropResult) => {
    let newColumns = cloneDeep(columns);
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = cloneDeep(board);
    //cập nhật lại columnOrder khi kéo thả
    newBoard.columnOrder = newColumns.map((c) => c._id);
    //cập nhật lại column khi kéo thả
    newBoard.columns = newColumns;
    //call API update columnOrder in Board detail
    setcolumns(newColumns);
    setBoard(newBoard);
    updateBoard(newBoard._id, newBoard).catch(() => {
      setcolumns(columns);
      setBoard(board);
    });
  };

  const onCardDrop = (columnID, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      //let newColumns = cloneDeep(columns)
      let currentColumn = newColumns.find((c) => c._id === columnID);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult); // sử lý card giống column (cập nhật dữ liệu)
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
      //console.log(dropResult) //hiện kết quả khi kéo thả
      setcolumns(newColumns);
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        //action : di chuyen card trong column
        // call api update column
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setcolumns(columns)
        );
      } else {
        //action : di chuyen card qua column khac
        // call api update cardOrder
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setcolumns(columns)
        );
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnID = currentColumn._id;
          // call api update column in current card
          updateCard(currentCard._id, currentCard);
        }
      }
    }
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    //tạo thêm bảng khi thêm công việc vào csdl
    const newColumnToAdd = {
      boardID: board._id,
      title: newColumnTitle.trim(),
    };
    createNewColumn(newColumnToAdd).then((column) => {
      let newColumns = [...columns];
      newColumns.push(column);

      let newBoard = { ...board };
      //cập nhật lại columnOrder ả
      newBoard.columnOrder = newColumns.map((c) => c._id);
      //cập nhật lại column
      newBoard.columns = newColumns;

      setcolumns(newColumns);
      setBoard(newBoard);
      setnewColumnTitle("");
      toggleOpenNewColumnForm(); //sau khi add thành công quay lại dongf thêm bảng công việc
    });
  };

  //Xóa sửa cột
  const onUpdateColumn = (newColumntoUpdate) => {
    const columnIdToUpdate = newColumntoUpdate._id;
    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i._id === columnIdToUpdate
    );
    if (newColumntoUpdate._destroy) {
      //xóa cột
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      // cập nhật lại bảng
      newColumns.splice(columnIndexToUpdate, 1, newColumntoUpdate);
    }
    let newBoard = { ...board };
    //cập nhật lại columnOrder ả
    newBoard.columnOrder = newColumns.map((c) => c._id);
    //cập nhật lại column
    newBoard.columns = newColumns;
    setcolumns(newColumns);
    setBoard(newBoard);
  };

  // sử dụng cơ sở dữ liệu gọi bản công việc
  useEffect(() => {
    // const boardFromDB = initialData.boards.find(boa  rd => board.id === 'board-1')
    const boardID = id;
    fetchBoardDetails(boardID).then((board) => {
      setBoard(board);
      //sắp xếp column từ database bằng sorts (gọi mapOrder)
      setcolumns(mapOrder(board.columns, board.columnOrder, "_id"));
    });
  }, []);

  //thiết kế khi nhấn vào nút thêm bảng công việc nó trỏ thằng vào bảng nhập công việc
  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus(); //trỏ thằng vào khi nhán thêm bảng công việc
      newColumnInputRef.current.select(); //bôi đen toàn bộ chữ trc đó khi nhấn icon xóa bật lại
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        board not found
      </div>
    );
  }

  return (
    <div className="board-content">
      {" "}
      {/*các công việc*/}
      {/* Kéo thả cả bảng công việc */}
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="huuquy-trello-container">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" /> Thêm bảng công việc mới
            </Col>
          </Row>
        )}

        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nhập tên bảng công việc "
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTileChange}
                onKeyDown={(event) => event.key === "Enter" && addNewColumn()} //sự kiện nhấn enter để thêm công việc
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Thêm Bảng
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                {" "}
                <i className="fa fa-trash icon"></i>{" "}
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
