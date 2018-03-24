import { Component, OnInit } from '@angular/core';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentManagementService } from '../../../core/documentManagement/documentManagement.service';
import { HttpError } from '../../../core/http/http-error.model';

@Component({
  selector: 'ccd-write-document-field',
  templateUrl: './write-document-field.html'
})
export class WriteDocumentFieldComponent extends AbstractFieldWriteComponent implements OnInit {
  private uploadedDocument: FormGroup;
  private selectedFile: File;
  private valid = true;
  private uploadError: string;

  constructor(private documentManagement: DocumentManagementService) {
    super();
  }

  ngOnInit() {
    let document = this.caseField.value;
    if (document) {
      this.createDocumentGroup(
        document.document_url,
        document.document_binary_url,
        document.document_filename,
      );
    }
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files[0]) {
      this.selectedFile = fileInput.target.files[0];

      // Perform the file upload immediately on file selection
      let documentUpload: FormData = new FormData();
      documentUpload.append('files', this.selectedFile, this.selectedFile.name);
      documentUpload.append('classification', 'PUBLIC');
      this.documentManagement.uploadFile(documentUpload).subscribe(result => {
        if (!this.uploadedDocument) {
          this.createDocumentGroup();
        }

        let document = result._embedded.documents[0];
        this.setDocumentGroupValues(
          document._links.self.href,
          document._links.binary.href,
          document.originalDocumentName,
        );

        this.valid = true;
      }, (error: HttpError) => {
        this.uploadError = this.getErrorMessage(error);
        this.valid = false;
      });
    } else {
      this.selectedFile = null;
      this.valid = true;
    }
  }

  private createDocumentGroup(url?: string, binaryUrl?: string, filename?: string): void {
    this.uploadedDocument = this.registerControl(new FormGroup({
      document_url: new FormControl(url),
      document_binary_url: new FormControl(binaryUrl),
      document_filename: new FormControl(filename)
    }));
  }

  private setDocumentGroupValues(url: string, binaryUrl: string, filename: string): void {
    this.uploadedDocument.get('document_url').setValue(url);
    this.uploadedDocument.get('document_binary_url').setValue(binaryUrl);
    this.uploadedDocument.get('document_filename').setValue(filename);
  }

  private getErrorMessage(error: HttpError): string {
    // Document Management unavailable
    if (0 === error.status || 502 === error.status) {
      return 'Document upload facility is not available at the moment';
    }

    return error.message;
  }
}
