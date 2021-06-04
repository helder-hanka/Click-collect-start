import loader from "../../loader.svg";

const Alert = {
  Error: ({ status }) => {
    return (
      status && (
        <div className="alert alert-danger" role="alert">
          Transaction could not be completed - please try again &nbsp;
          <i className="fas fa-times"></i>
        </div>
      )
    );
  },
  Cancelled: ({ status }) => {
    return (
      status && (
        <div className="alert alert-warning" role="alert">
          Transaction cancelled
        </div>
      )
    );
  },
  Confirmed: ({ status }) => {
    return (
      status && (
        <div className="alert alert-success" role="alert">
          Thank you for your order ❤️ - You will be redirected in a few seconds
          ...
          <img src={loader} className="App-logo ml-4" alt="loader" />
        </div>
      )
    );
  },
};
export default Alert;
