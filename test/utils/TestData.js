var savedValue;
/**
 * File for storing data that can be dynamically changed and shared between different steps
 * @type {{jurisdiction: string, caseType: string, event: string, mandatoryFields: []}}
 */
module.exports = {
  jurisdiction: 'Auto Test 1',
  caseType: 'All Field Data Types',
  event: 'Create a case',
  optionalFields: [],
  mandatoryFields: [],
  eventFields:[],
  caseReference: '',
  savedValue: 'undefined'
};
