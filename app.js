require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const app = express();
const { Sort, Filter } = require("./utils");
const PORT = process.env.PORT || 8000;
const WEBAPP_URL = process.env.WEBAPP_URL;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", WEBAPP_URL],
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/bookings", async (req, res) => {
  try {
    fs.readFile("./data.json", async (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err,
        });
      }
      let { page, perPage, sort, product, category } = req.query;
      let sortItem = null,
        sortOrder = null;
      if (sort) {
        let split = sort.split(",");
        sortItem = split[0] ? split[0] : null;
        sortOrder = split[1] ? split[1] : null;
      }

      let fromItems = 0;
      let toItems = 0;
      if (!perPage || perPage == 0) perPage = 5;
      else {
        perPage = parseInt(perPage);
        // if (perPage > 100) perPage = 100;
      }
      if (!page) page = 0;
      else {
        page = parseInt(page);
        if (page === 1) fromItems = perPage;
        if (page > 1) fromItems = page * perPage;
      }
      toItems = fromItems + perPage;

      let bookings = JSON.parse(data);
      // bookings = bookings.slice(0, 5);
      // filter
      let filteredBookings =
        product || category
          ? await Filter(product, category, bookings)
          : bookings;
      console.log("filtered bookings:", filteredBookings.length);
      // sort
      // console.log("sortItem, sortORder:", sortItem, sortOrder);
      let sortedBookings =
        sortItem && sortOrder
          ? await Sort(sortItem, sortOrder, filteredBookings)
          : filteredBookings;
      console.log("sorted bookings:", sortedBookings.length);
      // paginate
      // console.log("sortedBookings:", sortedBookings.length);

      let paginatedBookings = sortedBookings.slice(fromItems, toItems);
      console.log("paginated bookings:", paginatedBookings.length);
      return res.status(200).json({
        success: true,
        bookings: paginatedBookings,
        page,
        perPage,
        totalItems: sortedBookings.length,
      });
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: err });
  }
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => console.log(`listening on PORT:${PORT}`));
