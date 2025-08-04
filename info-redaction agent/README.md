# 🔐 AI-Powered Visual PII Detection & Redaction Pipeline

## 🧠 Overview

This project implements a **multi-stage privacy-preserving AI pipeline** designed to detect and extract Personally Identifiable Information (PII) from visual documents. The current prototype is capable of parsing scanned PDFs, extracting embedded images and text, identifying PII, and exporting both anonymized and human-readable outputs.

It supports layout-aware processing, multilingual handling (planned), and is adaptable for both scanned and digitally-generated documents.

---

## ✅ Current Progress

### 📁 Modules & Workflow

The following components have been implemented and tested:

1. **Image & Text Extraction:**
   - `enhanceimg.py`: Enhances PDF images for improved OCR performance.
   - `img_ext.py`: Extracts images from the PDF and saves them separately.
   - `parser.py`: Parses document structure and extracts structured text and layout.
   - `docling`: Used to convert documents to structured formats.

2. **PII Detection Engine:**
   - `pii_agent.py`: Extracts PII entities such as names, signatures, and locations using advanced language models (API-based).
   - Outputs results to a JSON file (`pii_text.json`) with detected PII type and corresponding entity.

3. **File I/O Outputs:**
   - `found_img/` directory contains:
     - Extracted images from the PDF
     - A **text-only PDF** with extracted text (`text_pdf.pdf`)
     - The original **enhanced PDF**
     - The generated **PII annotations in JSON**

### 🔍 Test Setup

- Tested using **4 input images converted into a PDF**.
- End-to-end pipeline has been verified for:
  - Image enhancement
  - Text extraction
  - PII detection
  - JSON output with extracted entities

---

## 📌 Files Overview

| File/Folder            | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `main.py`              | Entry point to the PII pipeline                                             |
| `enhanceimg.py`        | Enhances images in PDF for better OCR                                       |
| `parser.py`            | Parses layout and extracts text                                             |
| `img_ext.py`           | Image extraction and PDF writing                                            |
| `pii_agent.py`         | Core logic for PII extraction                                               |
| `found_img/`           | Stores extracted images, text-only PDFs, and `pii_text.json`                |
| `.env`                 | (Removed) Contains API keys for inference — not shared for security reasons |

---

## 🚧 Next Steps (Post-Prototype Phase)

We are actively working on:
- 🔒 **Visual Redaction Layer:** Automatically blur or mask faces, signatures, and text overlays using bounding boxes.
- 🧩 **Consent-Aware Redaction:** Allow users to specify which PII elements can be retained.
- 🗂 **Editable Review UI:** Human-in-the-loop verification and redaction editor (web-based).
- 🌐 **Language & Layout Support:** Extend support for multilingual documents and noisy real-world layouts (e.g., scanned forms).
- 🔎 **Audit Logs & Compliance Mode:** To ensure GDPR/HIPAA-ready pipelines.
- 📦 **Docker Deployment & API Server:** For cloud/on-prem integration.

---

## 🔗 Repository Access

> *The `.env` file has been intentionally excluded to protect API credentials. Please contact the authors for credentials or a demo.*

---

### 🙌 We look forward to advancing this into a production-ready, fully anonymized document redaction engine — and showcasing it at the NASSCOM finals!

