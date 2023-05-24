import { WebBrowser } from "langchain/tools/webbrowser";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });
const embeddings = new OpenAIEmbeddings();

const tools = [new WebBrowser({ model, embeddings })];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "chat-conversational-react-description",
  verbose: true,
});

const input = `
Below is a list of URLs for companies offering AZAV Certification in Germany.
Please visit each URL and find me an email address that I can contact to request a quotation for AZAV certification.

Once you have collected all the email addresses, add an email column to the original input, add all the email addresses you could find and provide the results as a CSV.

"""
name,url
acadCERT GmbH,https://acadcert.de/azav-traegerzulassung/
APV-Zertifizierungs GmbH,https://apv-zert.de/azav-traegerzulassung/
AZG Arneburger Zertifizierungsgesellschaft mbH,https://azg-zert.de/traegerzulassung-nach-azav/
"bag cert gmbh - bildung, arbeit, gesundheit & soziales",https://www.bag-cert.de/azav.html
Cert-IT - GmbH,https://www.cert-it.com/azav
CertEuropA GmbH,https://www.certeuropagroup.com/azav
CERTQUA,https://www.certqua.de/web/de/zertifizierungen/haupt_zertifizierungen/azav-traegerzulassung.php
Certuria Certification Germany GmbH,https://www.certuria.de/azav-zertifizierung-azav-zulassung/azav-traegerzulassung/
Dekra,https://www.dekra.de/de/azav-zertifizierung/
DeuZert Deutsche Zertifizierung in Bildung und Wirtschaft GmbH,https://www.deuzert.de/AZAV-Traegerzulassung/
DQS GmbH Deutsche Gesellschaft zur Zertifizierung von Managementsystemen,https://www.dqsglobal.com/de-de/zertifizieren/azav-zertifizierung
EQ ZERT Europäisches Institut zur Zertifizierung von Managementsystemen und Personal,https://www.eqzert.de/index.php/zertifizierung/439-azav-zertifizierung-traegerzulassung
EUROPANOZERT Zertifizierungen und Schulungen GmbH,https://europanozert.de/sgb-iii-azav/
GUT Certifizierungsgesellschaft für Managementsysteme mbH Umweltgutachter,https://www.gut-cert.de/leistungen/azav/sgb-iii
GüteZert Zertifizierungsgesellschaft und Umweltgutachter der Auftraggeber Güte- und Überwachungsgemeinschaften mbH,http://guetezert.de/azav/azav.html
GZQ GmbH,http://www.gzq.de/de/Nachweis_AZAV_5
HZA Hanseatische Zertifizierungsagentur GmbH,https://hansezertag.de/zertifizierung-nach-sgb-iii-azav/
ICG Zertifizierung GmbH,https://empus.de/zertifizierung/azav/
Kiwa ZERTPUNKT GmbH,https://www.kiwa.com/de/de/uber-kiwa/tochterfirmen/kiwa_zertpunkt_gmbh/
ÖHMI EuroCert GmbH,https://www.oehmi-cert.de/de/leistungen/azav-sgb-iii
proCum Cert GmbH Zertifizierungsgesellschaft,https://www.procum-cert.de/dienstleistungen/ueberblick/azav/
QUACERT Gesellschaft zur Zertifizierung von Qualitätsmanagement-Systemen mbH,https://quacert.de/index.php/de/zertifizierungen/bildungsmanagement/azav-akkreditierungs-und-zulassungsverordnung
Qualidata GmbH,https://qualidata.de/azav/
SocialCert GmbH,https://socialcert-gmbh.de/angebote/azav-traegerzulassung/
TAWCert Zertifizierungsgesellschaft mbH für Management-Systeme und Personal,https://www.taw-cert.de/systemzertifizierung/azav/
TQCert GmbH,https://www.tqcert.de/azav_fuer_bildungstraeger.html
TÜV Hessen,https://www.proficert.de/760/dienstleistung/azav-zertifizierung-qualitaetsmanagement-fuer-traeger-und-massnahmen-der-arbeitsfoerderung/
TÜV NORD CERT GmbH,https://www.tuev-nord.de/de/unternehmen/zertifizierung/azav/
TÜV Rheinland Cert GmbH,https://www.tuv.com/germany/de/azav-f%C3%BCr-tr%C3%A4ger.html
TÜV SÜD Management Service GmbH,https://www.tuvsud.com/de-de/dienstleistungen/auditierung-und-zertifizierung/bildung-und-schule/azav
Well Done Zertifizierungsgesellschaft mbH,https://well-done.de/azav/
ZDH-ZERT GmbH,https://www.zdh-zert.de/de-de/Leistungen/AZAV
"ZertSozial GmbH Prüfungsdienstleister für Soziales, Gesundheit und Bildung",https://zertsozial.de/angebote/azav/
"""
`;

const result = await executor.call({ input });

console.log(result.text);
