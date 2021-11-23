const json = [
  {
    id: 1,
    name: "cruising",
    bookings: [
      {
        id: 1,
        price: 200,
        booking_count: 345,
      },
      {
        id: 2,
        price: 100,
        booking_count: 545,
      },
      {
        id: 3,
        price: 400,
        booking_count: 945,
      },
    ],
  },
  {
    id: 2,
    name: "skating",
    bookings: [
      {
        id: 1,
        price: 500,
        booking_count: 745,
      },
      {
        id: 2,
        price: 900,
        booking_count: 1545,
      },
      {
        id: 3,
        price: 800,
        booking_count: 1945,
      },
    ],
  },
  {
    id: 3,
    name: "gliding",
    bookings: [
      {
        id: 1,
        price: 300,
        booking_count: 1745,
      },
      {
        id: 2,
        price: 500,
        booking_count: 2545,
      },
      {
        id: 3,
        price: 800,
        booking_count: 3945,
      },
    ],
  },
];

const bookings = [
  {
    id: 1,
    price: 300,
    booking_count: 1745,
  },
  {
    id: 2,
    price: 500,
    booking_count: 2545,
  },
  {
    id: 3,
    price: 800,
    booking_count: 3945,
  },
];

let obj = {
  perPage: 10,
};
obj = { perPage: obj.perPage + 20 };

// console.log("obj:", obj);

let str1 = "murali";
let str2 = "murali";
let arr = [str1];
console.log(arr);
arr[0] = str1;
console.log(arr);
