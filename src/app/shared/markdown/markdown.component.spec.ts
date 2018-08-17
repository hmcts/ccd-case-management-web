import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MarkdownComponent as CCDMarkDownComponent } from './markdown.component';
import { NgxMdModule, NgxMdComponent } from 'ngx-md';
import { By } from '@angular/platform-browser';

describe('MarkdownComponent', () => {

  const $MARKDOWN = By.css('markdown');

  const CONTENT = `| Tables   |      Are      |  Cool |
                |----------|:-------------:|------:|
                | col 1 is |  left-aligned | $1600 |
                | col 2 is |    centered   |   $12 |
                | col 3 is | right-aligned |    $1 |`;
  const EXPECTED_CONTENT = `<table>
<thead>
<tr>
<th>Tables</th>
<th style="text-align:center">Are</th>
<th style="text-align:right">Cool</th>
</tr>
</thead>
<tbody>
<tr>
<td>col 1 is</td>
<td style="text-align:center">left-aligned</td>
<td style="text-align:right">$1600</td>
</tr>
<tr>
<td>col 2 is</td>
<td style="text-align:center">centered</td>
<td style="text-align:right">$12</td>
</tr>
<tr>
<td>col 3 is</td>
<td style="text-align:center">right-aligned</td>
<td style="text-align:right">$1</td>
</tr>
</tbody>
</table>
`;

  let fixture: ComponentFixture<CCDMarkDownComponent>;
  let component: CCDMarkDownComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          NgxMdModule.forRoot()
        ],
        declarations: [
          CCDMarkDownComponent,
        ],
        providers: [
          NgxMdComponent
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CCDMarkDownComponent);
    component = fixture.componentInstance;
    component.content = CONTENT;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('Should render an html table', () => {
    expect(de.query($MARKDOWN).nativeElement.innerHTML).toBe(EXPECTED_CONTENT);
  });

});
