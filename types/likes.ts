export type Like = {
  count: number;
  isInteracted: boolean;
};

export enum SOCIAL_TYPES {
  Like = 'Like',
  Subscribe = 'Subscribe',
}

export enum SOCIAL_MODELS {
  User = 'User',
  Country = 'Country',
  City = 'City',
}

export type LikeSetRequest = {
  actionType: SOCIAL_TYPES;
  modelType: SOCIAL_MODELS;
  _id: string;
};
export type LikeSetResponse = Like & {};
