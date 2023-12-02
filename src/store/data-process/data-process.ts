import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortBy } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchNearOffer, fetchOffer, fetchOffersAction, fetchReview } from '../api-actions';
import { OfferType } from '../../types/offer-type';


const initialState: DataProcess = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  loadingStatus: false,
  activeSort: SortBy.Popular,
  nearByOffer: null,
  currentOffer: null,
  comments: null
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<OfferType[]>) {
      state.offers = action.payload;
    },
    setCityName(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
    changeSorting(state, action: PayloadAction<string>) {
      state.activeSort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loadingStatus = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers = [];
        state.loadingStatus = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.loadingStatus = false;
      })
      .addCase(fetchNearOffer.fulfilled, (state, action) => {
        state.nearByOffer = action.payload;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export const { setOffers, setCityName, changeSorting } = dataProcess.actions;
