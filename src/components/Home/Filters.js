import React from "react";
import { Context } from '../../context';

const Filters = {
  Category: function ({ name }) {
    const { updatecategory, category } = React.useContext(Context);

    const handleOnChange = (e) => updatecategory(e.target.value);
    return (
      <div className="mt-2 mb-2 pl-2">
        <div className="custom-control custom-checkbox">
          <input
            type="radio"
            onChange={handleOnChange}
            name="category"
            value={name}
            className="custom-control-input"
            id={name}
            checked= { category === name.toLowerCase() }
          />
          &nbsp;
          <label className="custom-control-label" htmlFor={name}>
            {name}
          </label>
        </div>
      </div>
    );
  },
  Filter: function ({ name }) {
    const { updateFilters } = React.useContext(Context);
    return (
      <div className="mt-2 mb-2 pl-2">
        <div className="custom-control custom-checkbox">
          <input
            name={name}
            onChange={updateFilters}
            type="checkbox"
            className="custom-control-input"
            id={name}
          />
          &nbsp;
          <label className="custom-control-label" htmlFor={name}>
            {name}
          </label>
        </div>
      </div>
    );
  },
};
export default Filters;
