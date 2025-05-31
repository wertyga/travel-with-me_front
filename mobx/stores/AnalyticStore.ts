import { makeObservable } from 'mobx';

import analytics from '@react-native-firebase/analytics';

import { RootStoreType } from '@/types';

export class AnalyticStore {
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

  async fireScreenChangeEvent() {
    const currentRoute = this.rootStore.routerStore.currentRoute;

    const title =
      currentRoute.params?.guide?.title ||
      currentRoute.params?.city?.title ||
      currentRoute.params?.point?.title;

    await analytics().logScreenView({
      screen_name: currentRoute.name,
      screen_class: title,
    });
  }
}
