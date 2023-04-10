function StatusCard(props) {
  var teste = !props.sucesso
    ? "d-flex justify-content-center flex-column align-items-center rounded w-50 h3 p-5 m-5 bg-success"
    : "d-flex justify-content-center flex-column align-items-center rounded w-50 h3 p-5 m-5 bg-danger";
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className={teste}>{props.error.message}</div>
    </div>
  );
}

export default StatusCard;
