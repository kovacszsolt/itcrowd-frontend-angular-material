import {Injectable} from '@angular/core';
import {openDb} from 'idb';
import {Observable, Subject} from 'rxjs';

export class AppServiceDB {
  protected _dataChange: Subject<any> = new Subject<any>();
  protected _dbPromise;

  protected databaseData;

  constructor(databaseData) {
    this.databaseData = databaseData;
    this.connectToIDB();
  }


  public getRange(from, to): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._dbPromise.then((db: any) => {
        const a = [];
        let cursorPos = 0;
        const data = [];
        const tx = db.transaction(this.databaseData.tableName);
        tx.objectStore(this.databaseData.tableName).iterateCursor(cursor => {
          if (!cursor) {
            return;
          }
          if ((cursorPos >= from) && (to > cursorPos)) {
            data.push(cursor.value);
          }
          cursorPos++;
          cursor.continue();
        });
        tx.complete.then(() => {

          resolve(data);
        });

      });
    });
  }


  connectToIDB() {
    this._dbPromise = openDb(this.databaseData.name, this.databaseData.version, UpgradeDB => {
      if (!UpgradeDB.objectStoreNames.contains(this.databaseData.tableName)) {
        const _store = UpgradeDB.createObjectStore(this.databaseData.tableName, {autoIncrement: true});
        this.databaseData.index.forEach((index) => {
          _store.createIndex(index, index, {unique: false});
        });

      }
    });
  }

  addItems(value: any) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(this.databaseData.tableName, 'readwrite');
      tx.objectStore(this.databaseData.tableName).put(value);
      this.getAllData().then((items: any) => {
        this._dataChange.next(items);
      });
      return tx.complete;
    });
  }

  deleteItems(value: any) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(this.databaseData.tableName, 'readwrite');
      const store = tx.objectStore(this.databaseData.tableName);
      store.delete(value);
      this.getAllData().then((items: any) => {
        this._dataChange.next(items);
      });
      return tx.complete;
    });
  }

  getAllData() {
    return this._dbPromise.then((db: any) => {
      const tx = db.transaction(this.databaseData.tableName, 'readonly');
      const store = tx.objectStore(this.databaseData.tableName);
      return store.getAll();
    });
  }

  countData() {
    return this._dbPromise.then((db: any) => {
      const tx = db.transaction(this.databaseData.tableName, 'readonly');
      const store = tx.objectStore(this.databaseData.tableName);
      return store.count();
    });
  }

  dataChanged(): Observable<any> {
    return this._dataChange;
  }
}
