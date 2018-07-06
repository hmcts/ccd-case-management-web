import { Jurisdiction } from './jurisdiction.model';

export let createJurisdiction = () => {
  const jurisdiction = new Jurisdiction();

  jurisdiction.id = 'TEST';
  jurisdiction.name = 'test';
  jurisdiction.description = 'test';

  return jurisdiction;
};
