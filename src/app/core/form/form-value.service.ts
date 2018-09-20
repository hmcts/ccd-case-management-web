import { Injectable } from '@angular/core';
import { CaseField } from '../../shared/domain/definition/case-field.model';

@Injectable()
export class FormValueService {

  public isEmpty(rawValue: object): boolean {
    return this.isEmptyObject(rawValue);
  }

  public sanitise(rawValue: object): object {
    return this.sanitiseObject(rawValue);
  }

  filterCurrentPageFields(caseFields: CaseField[], editFrom: any): any {
    let cloneForm = JSON.parse(JSON.stringify(editFrom));
    Object.keys(cloneForm['data']).forEach((key) => {
      if (caseFields.findIndex((element) => element.id === key) < 0) {
        delete cloneForm['data'][key];
      }
    });
    return cloneForm;
  }

  private isEmptyObject(rawObject: object): boolean {
    if (!rawObject) {
      return true;
    }

    let isEmpty = true;
    Object.keys(rawObject).forEach(key => {
      isEmpty = isEmpty && this.isEmptyValue(rawObject[key]);
    });
    return isEmpty;
  }

  private sanitiseObject(rawObject: object): object {
    if (!rawObject) {
      return rawObject;
    }

    let sanitisedObject = {};
    Object.keys(rawObject).forEach(key => {
      sanitisedObject[key] = this.sanitiseValue(rawObject[key]);
    });
    return sanitisedObject;
  }

  private isEmptyArray(rawArray: any[]): boolean {
    if (!rawArray) {
      return true;
    }

    let isEmpty = true;
    rawArray.forEach(item => {
      if (item.hasOwnProperty('value')) {
        isEmpty = isEmpty && this.isEmptyValue(item.value);
      }
    });

    return isEmpty;
  }

  private sanitiseArray(rawArray: any[]): any[] {
    if (!rawArray) {
      return rawArray;
    }

    rawArray.forEach(item => {
      if (item.hasOwnProperty('value')) {
        item.value = this.sanitiseValue(item.value);
      }
    });

    return rawArray;
  }

  private isEmptyValue(rawValue: any): boolean {
    let isEmpty = true;
    if (Array.isArray(rawValue)) {
      isEmpty = this.isEmptyArray(rawValue);
    }

    switch (typeof rawValue) {
      case 'object':
        isEmpty = this.isEmptyObject(rawValue);
        break;
      case 'number':
        isEmpty = String(rawValue) ? false : true;
        break;
      default:
        isEmpty = rawValue ? false : true;
    }
    return isEmpty;
  }

  private sanitiseValue(rawValue: any): any {
    if (Array.isArray(rawValue)) {
      return this.sanitiseArray(rawValue);
    }

    switch (typeof rawValue) {
      case 'object':
        return rawValue ? this.sanitiseObject(rawValue) : '';
      case 'string':
        return rawValue.trim();
      case 'number':
        return String(rawValue);
      default:
        return rawValue;
    }
  }

}
