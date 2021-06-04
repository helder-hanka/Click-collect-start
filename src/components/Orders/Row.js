function Row({date, id }) {
    return(
    <tr>
        <td data-th="Product">
          <h4>Order # { id } </h4>
          <p className="font-weight-light">Date : {date} </p>
        </td>
        
        <td className="actions" data-th="">
          <div className="text-right">
            <button className="btn btn-white border-secondary bg-white btn-md mb-2">
              <i className="fas fa-sync"></i>
            </button>
          </div>
        </td>
      </tr>)
}
export default Row