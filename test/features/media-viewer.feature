@functional @RDM4955
Feature: Viewing a list of supported types of documents with Media Viewer

Background:
  Given I have logged in

Scenario Outline: Create a case with a pdf document and view it on Media Viewer
  Given a file '<fileName>'
  And a case type to upload a file
  When I create a case of this case type with the file given
  And I navigate to tab 'Details'
  And I click the document link
  Then the media viewer is opened in a new tab
  And the pdf document is visible in the new tab

Examples:
| fileName           |
| document_pdf_1.pdf |

Scenario Outline: Create a case with an image of a supported type and view it on Media Viewer
  Given a file '<fileName>'
  And a case type to upload a file
  When I create a case of this case type with the file given
  And I navigate to tab 'Details'
  And I click the document link
  Then the media viewer is opened in a new tab
  And the image document is visible in the new tab

Examples:
| fileName             |
| document_jpg_1.jpg   |
| document_jpeg_2.jpeg |
| document_gif_1.gif   |
| document_png_1.png   |
| document_tif_1.tif   |

Scenario Outline: Create a case with a document of an unsupported type and view it on Media Viewer
  Given a file '<fileName>'
  And a case type to upload a file
  When I create a case of this case type with the file given
  And I navigate to tab 'Details'
  And I click the document link
  Then the media viewer is opened in a new tab
  And the document is shown as unsupported in the new tab

Examples:
| fileName             |
| document_doc_1.doc   |
| document_docx_1.docx |
| document_txt_1.txt   |
