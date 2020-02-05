@mediaviewer @functional
Feature: Set of scenarios to view supported and unsupported types of documents with Media Viewer

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
| document_pdf_2.PdF |

Scenario Outline: Create a case with an image of a supported type and view it on Media Viewer
  Given a file '<fileName>'
  And a case type to upload a file
  When I create a case of this case type with the file given
  And I navigate to tab 'Details'
  And I click the document link
  Then the media viewer is opened in a new tab
  And the image document is visible in the new tab

Examples:
| fileName               |
| document_jpg_1.jpg     |
| document_jpg_2.JpG     |
| document_jpeg_1.jpeg   |
| document_jpeg_2.JpEg   |
| document_png_1.png     |
| document_png_2.PnG     |
#| document_gif_1.gif     | # Disabled as gif files are not uploadable.
#| document_gif_2.GiF     | # Disabled as gif files are not uploadable.

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
| document_doc_2.DoC   |
| document_docx_1.docx |
| document_docx_2.DoCx |
| document_txt_1.txt   |
| document_txt_2.TxT   |
| document_tif_1.tif   |
| document_tif_2.TiF   |
| document_tiff_1.tiff |
| document_tiff_2.TiFf |
| document_mp3_1.mp3   |
| document_mp3_2.Mp3   |
| document_mov_1.mov   |
| document_mov_2.MoV   |
| document_avi_1.avi   |
| document_avi_2.Avi   |
