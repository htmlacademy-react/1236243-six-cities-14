import dayjs from 'dayjs';
import { RATING_STARS } from './const';

const calculateRating = (rating: number, stars: number = RATING_STARS) => Math.round(rating * 100 / stars);

const formatDateComment = (date: string) => dayjs(date).format('MMMM YYYY');

function sortDay (fieldName: string) {

  return (a: string, b:string) => dayjs(a[fieldName]) < dayjs(b[fieldName]) ? 1 : -1;
}

export {calculateRating, formatDateComment, sortDay};
