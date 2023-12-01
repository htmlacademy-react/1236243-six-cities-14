import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { OfferType } from './offer-type';
import { UserData } from './user-data';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    user: UserData | null;
}

export type DataProcess = {
    offers: OfferType[];
    selectedCity: string;
    loadingStatus: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
