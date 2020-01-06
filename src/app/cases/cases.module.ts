import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CaseCreatorSubmitComponent } from './creator/case-creator-submit.component';
import { CreateCaseEventTriggerResolver } from './creator/create-case-event-trigger.resolver';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivityModule, CaseHeaderModule, CaseReferencePipe,
  CaseUIToolkitModule,
  ConditionalShowModule, CreateCaseFiltersModule,
  EventLogModule, FieldsPurger,
  LabelSubstitutorModule,
  MarkdownModule, NavigationNotifierService, PageValidationService,
  PaletteModule, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';

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
  ],
  providers: [
    CaseReferencePipe,
    CreateCaseEventTriggerResolver,
    FieldsPurger,
    PlaceholderService,
    PageValidationService,
    NavigationNotifierService,
  ]
})
export class CasesModule {}
