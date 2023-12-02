import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { OfferType } from './offer-type';
import { CommentType } from './review-type';
import { UserData } from './user-data';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userInfo: UserData | null;
}

export type DataProcess = {
    offers: OfferType[];
    selectedCity: string;
    loadingStatus: boolean;
    activeSort: string;
    nearByOffer: OfferType[] | null;
    currentOffer: OfferType | null;
    comments: CommentType[] | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
