//Bài 8
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import {MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM} from 'Chức năng/Gán tên'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props
  return (
    <Modal
      show={show}
      onHide = {() => onAction('MODAL_ACTION_CLOSE')}
      backdrop ="static" //click bên ngoài không bị đóng thanh thông báo xóa
      keyboard = {false} // khi nhấn esc không bị ẩn 
      animation = {false} // tắt hiệu ứng
    >
      <Modal.Header closeButton>
        <Modal.Title className='h5'>{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick= {() => onAction('MODAL_ACTION_CLOSE')}>
              Đóng
        </Button>
        <Button variant="primary" onClick={() => onAction('MODAL_ACTION_CONFIRM')}>
              Chấp nhận và lưu
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal