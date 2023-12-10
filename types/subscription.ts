import { Price } from '@/types/guide';
import { User } from '@/types/user';

export enum SUBSCRIPTION_TAGS {
  Subscription = 'Subscription',
  List = 'Subscription.List',
  User = 'Subscription.User',
}

export type SubscriptionPreview = {
  id: string;
  name: string;
  price: Price;
  interval: string;
  description: string;
  isDisabled: boolean;
};

export type UserSubscription = {
  _id: string;
  createdAt: string;
  payment: string;
  interval: string;
  product: string;
  validUntil: string;
};

export type GetSubscriptionListResponse = {
  subscriptions: SubscriptionPreview[];
};

export type CreateSubscriptionResponse = {
  clientSecret: string;
  ephemeralKey: string;
  customer: string;
};

export type GetMySubscriptionRequest = {
  isActive?: boolean;
};
export type GetMySubscriptionResponse = {
  subscription: UserSubscription;
  disabledSubscriptionsIntervals: string[];
};
