const Alerta = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}
export default Alerta;