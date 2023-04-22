import React, { useEffect, useState } from "react";
import "./home.css";
import faker from "faker";
import ProductItem from "./ProductItem";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  let { byStock, byFastDelivery, byRating, searchQuery, sort } = useSelector(
    (state) => state.filterReducer
  );

  function transformProduct() {
    let filteredProducts = products;
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    }

    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      filteredProducts = filteredProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      searchQuery = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return filteredProducts;
  }

  console.log(byStock, byFastDelivery, byRating, searchQuery, sort);
  faker.seed(99);
  useEffect(() => {
    const products = [...Array(20)].map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.random.image(),
      inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }));
    setProducts(products);
  }, []);

  const handleRating = (rate) => {
    dispatch({ type: "FILTERED_BY_RATING", payload: rate });
  };

  return (
    <div className="home-cont">
      <div className="filters">
        <h1>Filter Products</h1>

        <div>
          <input
            type="radio"
            id="asc"
            name="group1"
            onChange={() =>
              dispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
          <label for="asc">Ascending</label>
        </div>

        <div>
          <input
            type="radio"
            id="dsc"
            name="group1"
            onChange={() =>
              dispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
            }
            checked={sort === "highToLow" ? true : false}
          />
          <label for="dsc">Descending</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="stock"
            name="group1"
            onChange={() =>
              dispatch({
                type: "FILTER_BY_STOCK",
              })
            }
            checked={byStock}
          />
          <label for="stock">Include Out of Stock</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="delivery"
            name="group1"
            onChange={() =>
              dispatch({
                type: "FILTER_BY_FAST_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
          <label for="delivery">Fast Delivery Only</label>
        </div>

        <div className="rating-cont">
          <span>Rating :</span>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="rating"
              onClick={() => handleRating(index + 1)}
            >
              {index < byRating ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>

        <div className="btn-wrapper">
          <button onClick={() => dispatch({ type: "CLEAR_FILTER" })}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="product-cont">
        <h1>Products</h1>
        <div className="products">
          {transformProduct().length > 0 &&
            transformProduct().map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
