import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CaseReferencePipe } from '../shared/utils/case-reference.pipe';
import { CaseResolver } from './case.resolver';
import { CaseViewerComponent } from './viewer/case-viewer.component';
import { PaletteModule } from '../shared/palette/palette.module';
import { EventLogModule } from '../shared/event-log/event-log.module';
import { EventTriggerResolver } from './event-trigger/event-trigger.resolver';
import { CaseEventTriggerComponent } from './event-trigger/case-event-trigger.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaletteUtilsModule } from '../shared/palette/utils/utils.module';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CreateCaseFiltersComponent } from './creator/filters/create-case-filters.component';
import { CasePrinterComponent } from './printer/case-printer.component';
import { CasePrintDocumentsResolver } from './printer/case-print-documents.resolver';
import { CaseCreatorSubmitComponent } from './creator/case-creator-submit.component';
import { CreateCaseFieldsResolver } from './creator/create-case-fields.resolver';
import { CaseEditComponent } from '../shared/case-editor/case-edit.component';
import { CallbackErrorsComponent } from '../shared/error/callback-errors.component';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { CaseEditPageComponent } from '../shared/case-editor/case-edit-page.component';
import { CaseEditSubmitComponent } from '../shared/case-editor/case-edit-submit.component';
import { ConditionalShowModule } from '../shared/conditional-show/conditional-show.module';
import { CaseEditFormComponent } from '../shared/case-editor/case-edit-form.component';
import { MarkdownModule } from '../shared/markdown/markdown.module';
import { LabelSubstitutionService } from '../shared/case-editor/label-substitution.service';
import { LabelSubstitutorModule } from '../shared/substitutor/label-substitutor.module';
import { CaseEditConfirmComponent } from '../shared/case-editor/case-edit-confirm.component';
import { PrintUrlPipe } from './printer/print-url.pipe';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemoveDialogComponent } from '../shared/remove-dialog/remove-dialog.component';

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
    BrowserAnimationsModule
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
    CallbackErrorsComponent,
    PrintUrlPipe,
    RemoveDialogComponent
  ],
  entryComponents: [RemoveDialogComponent],
  providers: [
    CasePrintDocumentsResolver,
    CaseReferencePipe,
    CaseResolver,
    CreateCaseFieldsResolver,
    EventTriggerResolver,
    LabelSubstitutionService,
  ]
})
export class CasesModule {}
