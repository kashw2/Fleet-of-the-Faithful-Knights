import {Injectable} from '@angular/core';
import {CrudLocalStorage} from '@kashw2/lib-util';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(readonly crudLocalStorageService: CrudLocalStorageService) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CrudLocalStorageService extends CrudLocalStorage {

  constructor() {
    super();
  }
}
