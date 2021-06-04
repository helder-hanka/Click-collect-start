import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../lib/queries';
import { Context } from '../../context'
import Card from './Card';
const styles = {
    gallery : {
      height: 'calc(100vh - 120px)', 
      overflow: 'scroll'
    }
}

function Gallery({ category }) {
  let array = [];
  const { filtersChecked } = React.useContext(Context);
  
  const productWithFilters = () => {
    if(!filtersChecked.length) {
      return data?.products
    }
    filtersChecked.forEach(filter => {
      array = [
        ...array, 
        ...data?.products?.filter(
        (product) => product.filter === filter.toLowerCase())]
    });
    return array;
  }

  const { loading, error, data } = useQuery(GET_PRODUCTS, {variables: {category: category}});
  if (loading) return <div>'Loading...'</div>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <div>No data</div>;

  const products = productWithFilters();

  return(
  <div className="col-md-8 order-md-2 col-lg-9">
    <div className="container-fluid" style={styles.gallery}>
      <div className="row">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  </div>)
  }
  export default Gallery