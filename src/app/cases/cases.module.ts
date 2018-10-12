import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CaseResolver } from './case.resolver';
import { CaseViewerComponent } from './viewer/case-viewer.component';
import { PaletteModule, PaletteUtilsModule, ConditionalShowModule, MarkdownModule,
  LabelSubstitutionService, RemoveDialogComponent, CaseReferencePipe, LabelSubstitutorModule,
  FieldsPurger } from '@hmcts/ccd-case-ui-toolkit';
import { EventLogModule } from '../shared/event-log/event-log.module';
import { EventTriggerResolver } from './event-trigger/event-trigger.resolver';
import { CaseEventTriggerComponent } from './event-trigger/case-event-trigger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CreateCaseFiltersComponent } from './creator/filters/create-case-filters.component';
import { CasePrinterComponent } from './printer/case-printer.component';
import { CasePrintDocumentsResolver } from './printer/case-print-documents.resolver';
import { CaseCreatorSubmitComponent } from './creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './creator/create-case-event-trigger.resolver';
import { CaseEditComponent } from '../shared/case-editor/case-edit.component';
import { CallbackErrorsComponent } from '../shared/error/callback-errors.component';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { CaseEditPageComponent } from '../shared/case-editor/case-edit-page.component';
import { CaseEditSubmitComponent } from '../shared/case-editor/case-edit-submit.component';
import { CaseEditFormComponent } from '../shared/case-editor/case-edit-form.component';
import { CaseEditConfirmComponent } from '../shared/case-editor/case-edit-confirm.component';
import { PrintUrlPipe } from './printer/print-url.pipe';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageValidationService } from '../shared/case-editor/page-validation.service';

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
    PaletteUtilsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    CallbackErrorsComponent,
    CaseCreatorComponent,
    CaseCreatorSubmitComponent,
    CaseEditConfirmComponent,
    CaseEditComponent,
    CaseEditPageComponent,
    CaseEditFormComponent,
    CaseEditSubmitComponent,
    CaseEventTriggerComponent,
    CasePrinterComponent,
    CaseViewerComponent,
    CreateCaseFiltersComponent,
    PrintUrlPipe,
    RemoveDialogComponent
  ],
  exports: [
    CallbackErrorsComponent,
  ],
  entryComponents: [RemoveDialogComponent],
  providers: [
    CasePrintDocumentsResolver,
    CaseReferencePipe,
    CaseResolver,
    CreateCaseEventTriggerResolver,
    EventTriggerResolver,
    FieldsPurger,
    LabelSubstitutionService,
    PageValidationService,
  ]
})
export class CasesModule {}
