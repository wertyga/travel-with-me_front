import { makeObservable } from 'mobx';
import { TestStore } from './TestStore';

export const stores = { testStore: TestStore };

// for (let key of props) {
//   console.log(key, typeof store[key]);
// }
// props.forEach(prop => {
//   console.log(prop, typeof store[prop]);
// });

export class RootStore {
  constructor() {
    makeObservable(this);

    Object.entries(stores).forEach(([storeName, Store]) => {
      const store = new Store(this);
      const props = Object.getOwnPropertyNames(Object.getPrototypeOf(store));
      // console.log({ store, Store });
      //
      for (let key of props) {
        if (key === 'constructor') continue;
        console.log({ key });
        store[key].bind(store);
      }
      // Object.entries(store).forEach(([name, value]) => {
      //   console.log(name, typeof value, 'asdasd');
      // });
      this[storeName] = store;
    });
  }
}
