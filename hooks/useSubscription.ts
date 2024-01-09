import { useGetMySubscriptionQuery } from '@/api';
import { useAuth } from '@/context';

export const useSubscription = () => {
  const { user } = useAuth();
  const { data: { subscription } = {} } = useGetMySubscriptionQuery(undefined, {
    skip: !user,
  });

  return { subscription };
};
