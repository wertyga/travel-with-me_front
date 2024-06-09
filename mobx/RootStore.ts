import {action, makeObservable} from 'mobx';

export type RootStoreType<T> = RootStore & T;

export class RootStore {
  private _stores: Record<string, any>;

  private _getStoreName(name) {
    return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
  }

  private _iterateStores(callback: (store) => void) {
    Object.keys(this._stores).forEach(name => {
      const storeName = this._getStoreName(name);
      callback(this[storeName]);
    });
  }
  
  private _initialize() {
    Object.entries(this._stores).forEach(([storeName, Store]) => {
      const store = new Store(this);
      const props = Object.getOwnPropertyNames(Object.getPrototypeOf(store));
      
      for (let key of props) {
        if (key === 'constructor' || Object.getOwnPropertyDescriptor(store, key)?.get) continue;
        
        store[key] = store[key].bind(store);
      }
      
      this[this._getStoreName(storeName)] = store;
    });
  }
  
  constructor(stores: Record<string, any>) {
    makeObservable(this);
    
    this._stores = stores;

    this._initialize();
    if (typeof window !== 'undefined') {
      setTimeout(() => this.runInitiations());
    }
  }
  
  runInitiations() {
    this._iterateStores((store: any) => {
      if (store.onInitiate) {
        store.onInitiate();
      }
    });
  }
  
  @action dropRootStore() {
    this._initialize();
  }
}
