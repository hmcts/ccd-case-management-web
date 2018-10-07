import { SearchInput } from './search-input.model';
import { Field } from './field.model';
import { FieldType } from '../../shared/domain/definition/field-type.model';

export let createSearchInputs = () => {
  const fieldType = new FieldType();
  fieldType.id = 'Text';
  fieldType.type = 'Text';
  const searchInput1 = new SearchInput('Label 1', 1, new Field('PersonFirstName', fieldType));
  const searchInput2 = new SearchInput('Label 2', 2, new Field('PersonLastName', fieldType, '', '', true));
  return [searchInput1, searchInput2];
};
