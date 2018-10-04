import { WizardPage, ShowCondition } from '@hmcts/ccd-case-ui-toolkit';
import createSpyObj = jasmine.createSpyObj;

export let aWizardPage = (pageId: string, label: string, order: number): WizardPage => {
    let wp = new WizardPage();
    wp.id = pageId;
    wp.label = label;
    wp.order = order;
    let parsedShowCondition = createSpyObj<ShowCondition>('parsedShowCondition', ['match']);
    parsedShowCondition.match.and.returnValue(true);
    wp.parsedShowCondition = parsedShowCondition;
    return wp;
  };
