import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

export let createJurisdiction = () => {
  const jurisdiction = new Jurisdiction();

  jurisdiction.id = 'TEST';
  jurisdiction.name = 'test';
  jurisdiction.description = 'test';

  return jurisdiction;
};
