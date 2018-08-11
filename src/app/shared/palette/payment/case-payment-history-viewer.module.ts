import { NgModule } from '@angular/core';
import { CasePaymentHistoryViewerFieldComponent } from './case-payment-history-viewer-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaletteUtilsModule } from '../utils/utils.module';
import { CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { PaymentLibModule } from '@hmcts/ccpay-web-component';
import { SharedUtilsModule } from '../../utils/shared-utils.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaletteUtilsModule,
    CaseUIToolkitModule,
    PaymentLibModule,
    SharedUtilsModule,
  ],
  declarations: [
    CasePaymentHistoryViewerFieldComponent
  ],
  entryComponents: [
    CasePaymentHistoryViewerFieldComponent,
  ]
})
export class CasePaymentHistoryViewerModule {}
