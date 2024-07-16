import "./Popup.scss"

export default function Popup({value}) {
  return (
    <div className="popup">
        {value > 0 ? "Successful!" : "Something went wrong!"}
    </div>
  )
}
