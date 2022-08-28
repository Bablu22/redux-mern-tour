import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/cteateTour",
  async ({ data, navigate, toast, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", "redux-tour");
      formData.append("cloud_name", "dmkyaq9vt");

      const imageRes = await fetch(
        "https://api.cloudinary.com/v1_1/dmkyaq9vt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const res2 = await imageRes.json();
      const imageURL = res2.url;
      data.imageFile = imageURL;
      const res = await api.createTourApi(data)
      toast.success("Your tour is upload");
      navigate("/");
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getTour = createAsyncThunk(
  "tour/getTour",
  async (_, { rejectWithValue }) => {
    try {

      const res = await api.getTourApi();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getSingleTour = createAsyncThunk(
  "tour/getSingleTour",
  async (id, { rejectWithValue }) => {
    try {

      const res = await api.getTour(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTourByUser = createAsyncThunk(
  "tour/getTourByUser",
  async (userId, { rejectWithValue }) => {
    try {

      const res = await api.getTourByUserAPI(userId);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      console.log(id);
      const res = await api.deleteTourApi(id);
      toast.success('Tour deleted success')
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ tourData, id, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log(id, tourData);
      const res = await api.updateTourApi(tourData, id);
      toast.success('Tour Updated success')
      navigate("/");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTour: [],
    error: "",
    looding: false,
  },

  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.looding = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.looding = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // Get tour
    [getTour.pending]: (state, action) => {
      state.looding = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.looding = false;
      state.tours = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // Get single tour
    [getSingleTour.pending]: (state, action) => {
      state.looding = true;
    },
    [getSingleTour.fulfilled]: (state, action) => {
      state.looding = false;
      state.tour = action.payload;
    },
    [getSingleTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // Get tour by user id
    [getTourByUser.pending]: (state, action) => {
      state.looding = true;
    },
    [getTourByUser.fulfilled]: (state, action) => {
      state.looding = false;
      state.userTour = action.payload;
    },
    [getTourByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // Delete tour
    [deleteTour.pending]: (state, action) => {
      state.looding = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.looding = false;
      const { arg: { id }, } = action.meta;
      if (id) {
        state.userTour = state.userTour.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    // Update tour
    [UpdateTour.pending]: (state, action) => {
      state.looding = true;
    },
    [UpdateTour.fulfilled]: (state, action) => {
      state.looding = false;
      const { arg: { id }, } = action.meta;
      if (id) {
        state.userTours = state.userTour.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }

    },
    [UpdateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});

export default tourSlice.reducer;
