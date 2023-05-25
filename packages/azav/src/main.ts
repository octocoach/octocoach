import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs";

const fillForm = async () => {
  const url =
    "https://apv-zert.de/wp-content/uploads/2023/02/08SAFB3-Unternehmensauskunft-AZAV.pdf";
  const formUrl = await fetch(url);
  const formPdfBytes = await formUrl.arrayBuffer();

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const form = pdfDoc.getForm();

  form
    .getTextField("Name Bezeichnung gemäß Registereintrag")
    .setText("OctoCoach");

  form.getTextField("Anschrift der Zentrale").setText(`
  Mulvanystraße 2
  40239 Düsseldorf
  `);
  form.getTextField("EMail").setText("avanderbergh@hmail.com");
  form.getTextField("Vorname").setText("Adriaan");
  form.getTextField("Nachname").setText("van der Bergh");
  form.getTextField("Mobil").setText("0176 5537 5225");
  form.getTextField("Homepage").setText("https://octo.coach");

  form.flatten();

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync("filled_form.pdf", Buffer.from(pdfBytes));
};

fillForm();
