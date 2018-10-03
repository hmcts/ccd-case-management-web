import { Injectable } from '@angular/core';
import { CaseField } from '../domain/definition/case-field.model';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '../palette/utils/date.pipe';
import { WizardPage } from '../domain/wizard-page.model';
import { Predicate } from '../predicate';

@Injectable()
export class FieldsUtils {

  private static readonly currencyPipe: CurrencyPipe = new CurrencyPipe('en-GB');
  private static readonly datePipe: DatePipe = new DatePipe();
  public static readonly LABEL_SUFFIX = '-LABEL';

  public static toValuesMap(caseFields: CaseField[]): any {
    let valueMap = {};
    caseFields.forEach(field => {
      valueMap[field.id] = field.value;
    });
    return valueMap;
  }

  private static readonly DEFAULT_MERGE_FUNCTION = function mergeFunction(field: CaseField, result: any) {
    if (!result.hasOwnProperty(field.id)) {
      result[field.id] = field.value;
    }
  };

  private static readonly LABEL_MERGE_FUNCTION = function mergeFunction(field: CaseField, result: any) {
    if (!result.hasOwnProperty(field.id)) {
      result[field.id] = field.value;
    }
    switch (field.field_type.type) {
      case 'FixedList': {
        result[field.id] = FieldsUtils.getFixedListLabelByCodeOrEmpty(field, result[field.id] || field.value);
        break;
      }
      case 'MultiSelectList': {
        let fieldValue = result[field.id] || [];
        result[field.id + FieldsUtils.LABEL_SUFFIX] = [];
        fieldValue.forEach((code, idx) => {
          result[field.id + FieldsUtils.LABEL_SUFFIX][idx] = FieldsUtils.getFixedListLabelByCodeOrEmpty(field, code);
        });
        break;
      }
      case 'MoneyGBP': {
        let fieldValue = (result[field.id] || field.value);
        result[field.id] = FieldsUtils.getMoneyGBP(fieldValue);
        break;
      }
      case 'Date': {
        let fieldValue = (result[field.id] || field.value);
        result[field.id] = FieldsUtils.getDate(fieldValue);
        break;
      }
      case 'Collection': {
        let elements = (result[field.id] || field.value);
        if (elements) {
          elements.forEach(elem => {
            switch (field.field_type.collection_field_type.type) {
              case 'MoneyGBP': {
                elem.value = FieldsUtils.getMoneyGBP(elem.value);
                break;
              }
              case 'Date': {
                elem.value = FieldsUtils.getDate(elem.value);
                break;
              }
            }
          });
        }
        break;
      }
    }
  };

  private static getMoneyGBP(fieldValue) {
    return fieldValue ? FieldsUtils.currencyPipe.transform(fieldValue / 100, 'GBP', 'symbol') : fieldValue;
  }

  private static getDate(fieldValue) {
    try {
      return FieldsUtils.datePipe.transform(fieldValue, null, 'dd-MM-yyyy');
    } catch (e) {
      return this.textForInvalidField('Date', fieldValue);
    }
  }

  private static getFixedListLabelByCodeOrEmpty(field, code) {
    let relevantItem = code ? field.field_type.fixed_list_items.find(item => item.code === code) : '';
    return relevantItem ? relevantItem.label : '';
  }

  private static textForInvalidField(type: string, invalidValue: string): string {
    return `{ Invalid ${type}: ${invalidValue} }`;
  }

  public buildCanShowPredicate(eventTrigger, form): Predicate<WizardPage> {
    let currentState = this.mergeCaseFieldsAndFormFields(eventTrigger.case_fields, form.controls['data'].value);
    return (page: WizardPage): boolean => {
      return page.parsedShowCondition.match(currentState);
    };
  }

  mergeCaseFieldsAndFormFields(caseFields: CaseField[], formFields: any): any {
    return this.mergeFields(caseFields, formFields, FieldsUtils.DEFAULT_MERGE_FUNCTION);
  }

  mergeLabelCaseFieldsAndFormFields(caseFields: CaseField[], formFields: any): any {
    return this.mergeFields(caseFields, formFields, FieldsUtils.LABEL_MERGE_FUNCTION);
  }

  private mergeFields(caseFields: CaseField[], formFields: any, mergeFunction: (CaseField, any) => void) {
    let result = this.cloneObject(formFields);
    caseFields.forEach(field => {
      mergeFunction(field, result);
    });
    return result;
  }

  private cloneObject(obj: any): any {
    return Object.assign({}, obj);
  }

  showGrayBar(caseField: CaseField, element: HTMLElement) {
    if (caseField.field_type.type !== 'Collection') {
      let divSelector = element.querySelector('div');
      let cyaSelector = false;

      if (divSelector) {
        let tempElement = divSelector.parentElement;
        while (tempElement.parentElement) {
          if (tempElement.tagName === 'FORM') {
            if (tempElement.classList.contains('check-your-answers')) {
              cyaSelector = true;
            }
          }
          tempElement = tempElement.parentElement;
        }
        if (!cyaSelector) {
          divSelector.classList.add('panel');
        }
      }
    }
  }

/*
  showGrayBar(caseField: CaseField, element: HTMLElement) {
    if (caseField.field_type.type !== 'Collection') {
      let divSelector = element.querySelector('div');
      let cyaSelector = false;
      let idElements = null;
      idElements = document.querySelectorAll('*[id]');
      let idList = [];
      for (let i = 0; i < idElements.length ; i++) {
        idList.push(idElements[i].id.replace(/-yes|-no/gi, ''));
      }
      let condFields = this.getConditionFields(caseField.show_condition);
      let samePage = condFields.every(r => idList.includes(r));

      if (divSelector) {
        let tempElement = divSelector.parentElement;
        while (tempElement.parentElement) {
          if (tempElement.tagName === 'FORM') {
            if (tempElement.classList.contains('check-your-answers')) {
              cyaSelector = true;
            }
          }
          tempElement = tempElement.parentElement;
        }
        if (!cyaSelector && samePage) {
          divSelector.classList.add('panel');
        }
      }
    }
  }
  */

  getConditionFields(condition: string): any[] {
    let condFields = [];
    let conditions = condition.split('AND');
    conditions.forEach(cond => condFields.push(cond.split('=')[0].trim()));
    return condFields;
  }
}
