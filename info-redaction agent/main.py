from enhanceimg import process_pdf_for_ocr
from parser import extract_document_elements
from img_ext import extract_and_save_images_from_pdf,write_text_to_pdf_from_data
from pii_agent import execute_pii
from docling.document_converter import DocumentConverter


pdf="test_pdf.pdf"
pdf1="p_test_pdf.pdf"
pdf2="found_img/text_pdf.pdf"

process_pdf_for_ocr(pdf,pdf1)

con=DocumentConverter()
res=con.convert(pdf)
img,txt=extract_document_elements(res.document)

extract_and_save_images_from_pdf(pdf,img)
write_text_to_pdf_from_data(txt,pdf2)
res=execute_pii(txt)

print(img)
print(txt)
print(res)

