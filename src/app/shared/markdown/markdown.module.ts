import { NgModule } from '@angular/core';
import { MarkdownComponent } from './markdown.component';
import { MarkdownModule as AngularMarkdownModule } from 'ngx-md';

@NgModule({
  imports: [
    AngularMarkdownModule.forRoot()
  ],
  declarations: [
    MarkdownComponent
  ],
  exports: [
    MarkdownComponent
  ]
})
export class MarkdownModule {}
