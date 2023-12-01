import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../types/offer-type';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { CommentType } from '../types/review-type';
import { CommentData } from '../types/comment-data';


type ApiAction = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<void, undefined, ApiAction>('data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOfferDataLoadingStatus(false));
    dispatch(loadOffers(data));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, ApiAction>('user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ApiAction>('user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ApiAction>('user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  });

export const fetchOffer = createAsyncThunk<OfferType, OfferType['id'], ApiAction>('data/fetchOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearOffer = createAsyncThunk<OfferType[], OfferType['id'], ApiAction>('data/fetchNearOffer',
  async (offerId, { extra: api }) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const fetchReview = createAsyncThunk<CommentType[], OfferType['id'], ApiAction>('data/fetchReview',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const sendFormComment = createAsyncThunk<void, CommentData, ApiAction >('data/sendFormComment',
  async ({idComment, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<CommentData>(`${APIRoute.Comments}/${idComment}`, {comment, rating});
    dispatch(addComment(data));
  }
);
