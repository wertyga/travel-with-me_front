import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '@/mobx/RootStore';

export class TestStore {
  @observable test = 1;

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  @action update = () => {
    console.log(this);
    this.test += 1;
  };

  func() {
    console.log('fff');
  }
}
