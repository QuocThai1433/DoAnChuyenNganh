//bai 8
//sự kiện save lại khi nhấn enter
export const saveContentAfterPressEnter=(e) => {
  if (e.key ==='Enter')
  {
    e.preventDefault()
    e.target.blur()
  }
}
//sự kiện kiện khu trỏ vào sẽ chọn hết tất cả chữ
export const selectAllInLineText = (e) => {
  e.target.focus()
  e.target.select()
}