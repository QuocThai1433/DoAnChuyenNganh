import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import './Column.scss'
import { mapOrder } from 'Chức năng/Sắp xếp'
import Card from '3 Thành Phần Của Web/Card/Card'
import ConfirmModal from '3 Thành Phần Của Web/Bảng Thông Báo/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'Chức năng/Gán tên'
import { saveContentAfterPressEnter, selectAllInLineText } from 'Chức năng/contentEditable'
import { cloneDeep } from 'lodash'
import { createNewCard, updateColumn } from 'Action/ApiCall'
//import { type } from '@testing-library/user-event/dist/type'

function Column(props)
{
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')
  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const ToggleshowConfirmModal = () => setshowConfirmModal(!showConfirmModal)
  const [columnTitle, setColumnTitle]= useState('')
  const handleColumnTitleChange =(e) => setColumnTitle(e.target.value)
  const [openNewCardForm, setOpenNewCardForm]= useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const newCardTextareaRef = useRef(null)
  const [newCardTitle, setnewCardTitle] = useState('')
  const onNewCardTileChange = (e) => setnewCardTitle (e.target.value)

  const addNewCard=() => {
    if (! newCardTitle)
    {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd= {
      boardID: column.boardID,
      columnID: column._id,
      title: newCardTitle.trim()
      //cover: []
    }
    //api
    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)
      //cập nhật dữ liệu
      onUpdateColumn(newColumn)
      //thêm công việc hiển thị lên bảng c
      setnewCardTitle('')
      toggleOpenNewCardForm()
    })
  }
  // xóa cột
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM)
    {
      //xóa các công việc
      const newColumn ={
        ...column,
        _destroy: true
      }
      //call API
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumn(updatedColumn)
      })
    }
    ToggleshowConfirmModal()//khi Nhấn đóng nó ẩn thanh thông báo xóa
  }
  // update column
  const handleColumnTitleBlur = () => {
    if (columnTitle !== column.title) {
      const newColumn ={
        ...column,
        title: columnTitle
      }
      //call API
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        updatedColumn.cards = newColumn.cards
        onUpdateColumn(updatedColumn)
      })
    }
  }

  useEffect ( () => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(( ) => {
    if (newCardTextareaRef && newCardTextareaRef.current)
    {
      newCardTextareaRef.current.focus()//trỏ thằng vào khi nhán thêm bảng công việc
      newCardTextareaRef.current.select()//bôi đen toàn bộ chữ trc đó khi nhấn icon xóa bật lại
    }
  }, [openNewCardForm])


  return (
    <div className="column"> {/*cột công việc*/}
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size='sm'
            type="text"
            className="huuquy-content-editable"
            value= {columnTitle}
            onChange = {handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInLineText}
            onMouseDown = {e => e.preventDefault()}
            spellCheck="false"
          //onKeyDown= {event => (event.key === 'Enter') && addNewColumn() } //sự kiện nhấn enter để thêm công việc
          />
        </div>

        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn'/>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Thêm công việc mới</Dropdown.Item>
              <Dropdown.Item onClick={ToggleshowConfirmModal} > Xóa thẻ </Dropdown.Item>
              <Dropdown.Item >Xóa tất cả công việc</Dropdown.Item>
              <Dropdown.Item >Xóa tất cả công việc</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </header>
      <div className="Card-list">
        {/* Kéo thả từng công việc */}
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          { cards.map((card, index) =>
            (
              <Draggable key={index}>
                <Card card= {card} />
              </Draggable>
            )
          ) }
        </Container>
        {/* Thêm công việc mới */}
        {openNewCardForm &&
         <div className='add-new-card'>
           <Form.Control
             size='sm'
             as="textarea"
             rows="3"
             placeholder="Nhập thêm công việc "
             className="textarea-enter-new-card"
             ref={newCardTextareaRef}
             value= {newCardTitle}
             onChange = {onNewCardTileChange}
             onKeyDown= {event => (event.key === 'Enter') && addNewCard() } //sự kiện nhấn enter để thêm công việc
           />
         </div>
        }
      </div>

      <footer>
        {openNewCardForm &&
         <div className='add-new-card-actions'>
           <Button variant="success" size="sm" onClick={addNewCard}>Thêm công việc</Button>
           <span className="cancel-icon" onClick={toggleOpenNewCardForm} > <i className='fa fa-trash icon'></i> </span>
         </div>
        }
        {!openNewCardForm &&
         <div className='footer-actions' onClick={toggleOpenNewCardForm}> <i className="fa fa-plus icon"></i> Thêm công việc mới </div>
        }
      </footer>

      {/* thiết kế ẩn hiện thanh thông báo */}
      <ConfirmModal
        show= {showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content = {`Bạn có chắc chắn muốn xóa <strong>${ column.title } </strong> <br /> Những công việc sẽ bị xóa `}
      />

    </div>
  )
}

export default Column