import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';


const initialState: DataProcess = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  loadingStatus: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers = [];
        state.loadingStatus = true;
      });
  }
});
