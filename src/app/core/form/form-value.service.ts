import { Injectable } from '@angular/core';
import { CaseField } from '../../shared/domain/definition/case-field.model';

@Injectable()
export class FormValueService {

  public sanitise(rawValue: object): object {
    return this.sanitiseObject(rawValue);
  }

  private sanitiseObject(rawObject: object): object {
    if (!rawObject) {
      return rawObject;
    }

    let sanitisedObject = {};
    Object.keys(rawObject).forEach(key => {
      if ('case_reference' === key && 'string' === typeof rawObject[key]) {
        sanitisedObject[key] = this.sanitiseValue(this.sanitiseCaseReference(rawObject[key]));
      } else {
        sanitisedObject[key] = this.sanitiseValue(rawObject[key]);
      }
    });
    return sanitisedObject;
  }

  /**
   * Sanitise a case reference, if possible, given a string.
   * @param {string} reference - case reference
   * @returns {string}
   */
  public sanitiseCaseReference(reference: string): string {
    const regex = /#?[\d-]*/g;
    const found = reference.match(regex).filter(s => s.length > 0).reverse();
    if (found[0]) {
      const s: string = found[0].replace(/[\D]/g, '');
      if (16 === s.length) {
        return s;
      }
    }
    return reference;
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

  private sanitiseValue(rawValue: any): any {
    if (Array.isArray(rawValue)) {
      return this.sanitiseArray(rawValue);
    }

    switch (typeof rawValue) {
      case 'object':
        return this.sanitiseObject(rawValue);
      case 'string':
        return rawValue.trim();
      case 'number':
        return String(rawValue);
      default:
        return rawValue;
    }
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
}
