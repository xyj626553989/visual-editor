class IStorage {
  constructor(private storage: Storage) {}
  public setItem(key: string, value: any, maxAge: number = 3600 * 24 * 2) {
    const time = new Date().getTime();
    const obj = {
      limitTime: maxAge + time,
      value: value,
    };
    this.storage.setItem(key, JSON.stringify(obj));
  }
  public getItem(key: string) {
    const time = new Date().getTime();
    const str = this.storage.getItem(key);
    if (str) {
      const obj = JSON.parse(str);
      if (obj.limitTime >= time) {
        return obj.value;
      }
      this.removeItem(key);
    }
  }
  public removeItem(key: string) {
    this.storage.removeItem(key);
  }
  public clear() {
    this.storage.clear();
  }
}

export default new IStorage(window.localStorage);
