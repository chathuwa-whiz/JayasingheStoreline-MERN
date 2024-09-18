import React from 'react'
import { useAllProductsQuery } from '../redux/api/productApiSlice';

export default function Report() {

    const { data: products, isLoading, isError } = useAllProductsQuery();

    console.log(products);

  return (
    <div>
      This is report
    </div>
  )
}
