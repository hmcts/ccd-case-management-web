import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaletteModule, ConditionalShowModule, MarkdownModule,
  CaseReferencePipe, LabelSubstitutorModule, CaseHeaderModule,
  FieldsPurger, PageValidationService, PlaceholderService, EventLogModule, ActivityModule,
  NavigationNotifier
} from '@hmcts/ccd-case-ui-toolkit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CaseCreatorSubmitComponent } from './creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './creator/create-case-event-trigger.resolver';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCaseFiltersModule } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components';
import { CaseViewerConsumerComponent } from './viewer/case-viewer-consumer.components';

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
    CreateCaseFiltersModule
  ],
  declarations: [
    CaseCreatorComponent,
    CaseCreatorSubmitComponent,
    CaseViewerConsumerComponent,
  ],
  providers: [
    CaseReferencePipe,
    CreateCaseEventTriggerResolver,
    FieldsPurger,
    PlaceholderService,
    PageValidationService,
    NavigationNotifier,
  ]
})
export class CasesModule {}
