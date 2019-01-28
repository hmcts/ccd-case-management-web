import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CaseResolver } from './case.resolver';
import { PaletteModule, ConditionalShowModule, MarkdownModule,
  CaseReferencePipe, LabelSubstitutorModule, CaseHeaderModule,
  FieldsPurger, PageValidationService, PlaceholderService, EventLogModule, ActivityModule
} from '@hmcts/ccd-case-ui-toolkit';
import { EventTriggerResolver } from './event-trigger/event-trigger.resolver';
import { CaseEventTriggerComponent } from './event-trigger/case-event-trigger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CreateCaseFiltersComponent } from './creator/filters/create-case-filters.component';
import { CasePrinterComponent } from './printer/case-printer.component';
import { CasePrintDocumentsResolver } from './printer/case-print-documents.resolver';
import { CaseCreatorSubmitComponent } from './creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './creator/create-case-event-trigger.resolver';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaseViewConsumerComponent } from './viewer/case-view-consumer.component';
import { PrintUrlPipe } from './printer/print-url.pipe';

@NgModule({
  imports: [
    CaseUIToolkitModule,
    CommonModule,
    ConditionalShowModule,
    EventLogModule,
    FormsModule,
    LabelSubstitutorModule,
    MarkdownModule,
    PaletteModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ActivityModule,
    CaseHeaderModule,
  ],
  declarations: [
    CaseCreatorComponent,
    CaseCreatorSubmitComponent,
    CaseEventTriggerComponent,
    CasePrinterComponent,
    CreateCaseFiltersComponent,
    CaseViewConsumerComponent,
    // PrintUrlPipe,
  ],
  providers: [
    CasePrintDocumentsResolver,
    CaseReferencePipe,
    CaseResolver,
    CreateCaseEventTriggerResolver,
    EventTriggerResolver,
    FieldsPurger,
    PlaceholderService,
    PageValidationService,
  ]
})
export class CasesModule {}
