const Sort = async (sortItem, sortOrder, json) => {
  let sortedBookings = await json.sort((first, second) => {
    let firstMinPrice, secondMinPrice;
    if (first.bookings.length > 1) {
      firstMinPrice = first.bookings.sort((a, b) => a - b)[0][sortItem];
    } else firstMinPrice = 0;
    if (second.bookings.length > 1) {
      secondMinPrice = second.bookings.sort((a, b) => a - b)[0][sortItem];
    } else secondMinPrice = 0;
    if (sortOrder === "ASC") return firstMinPrice - secondMinPrice;
    else return secondMinPrice - firstMinPrice;
  });
  return sortedBookings;
};
const Filter = async (product, category, json) => {
  let productFilteredBookings = product
    ? await json.filter((booking) =>
        booking.product_title.toLowerCase().includes(product.toLowerCase())
      )
    : json;

  let categoryFilteredBookings = category
    ? await productFilteredBookings.filter((booking) =>
        booking.segments.find((segment) =>
          segment.toLowerCase().includes(category.toLowerCase())
        )
      )
    : productFilteredBookings;
  return categoryFilteredBookings;
};

module.exports = { Sort, Filter };
