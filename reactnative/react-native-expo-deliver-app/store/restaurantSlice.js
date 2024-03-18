import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
}

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
})

export default restaurantSlice.reducer;