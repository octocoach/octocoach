import { Organization } from "@octocoach/db/schemas/common/organization";
import { Locales } from "@octocoach/i18n/src/i18n-types";

type MakeTerms = (organization: Organization) => string;

export const makeTerms: Record<Locales, MakeTerms> = {
  en: (organization) => `## Introduction

  Welcome to the Terms of Use for ${
    organization.legalName
  } (hereafter referred to as "${
    organization.displayName
  }") . These terms govern your use of our website and services, including any content, functionality, and services offered on or through https://${
    organization.domain || `octo.coach/org/${organization.slug}`
  }.
  
  By accessing or using the service, you agree to be bound by these terms. If you do not agree to these terms, do not use our services.
  
  These Terms of Use apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
  
  Please read these Terms of Use carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Use. If these Terms of Use are considered an offer, acceptance is expressly limited to these Terms of Use.
  
  Any new features or tools which are added to the current service shall also be subject to the Terms of Use. You can review the most current version of the Terms of Use at any time on this page. We reserve the right to update, change or replace any part of these Terms of Use by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
  
  **Contact Information**:
  
  For any questions about the Terms of Use, please contact us at:
  
  Email: ${organization.email}
  Phone: ${organization.phone}
  
  ## Account Registration and Use

  To access certain features or areas of our website, you may be required to create an account with ${
    organization.displayName
  }. In doing so, you agree to provide accurate, current, and complete information about yourself as prompted by our registration forms. It is your responsibility to maintain the accuracy of this information and keep it up to date.

  You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify ${
    organization.displayName
  } immediately of any unauthorized use of your account or any other breach of security.

  ${
    organization.displayName
  } reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.

  Users may not use our services for any illegal or unauthorized purpose nor may they, in the use of the Service, violate any laws in their jurisdiction (including but not limited to copyright laws).

  By creating an account, you affirm that you are at least 16 years of age. The service is not available to individuals under the age of 16. It is your responsibility to ensure that you meet this age requirement.

  ## Use of Services

  ${
    organization.displayName
  } provides a range of services aimed at enhancing the career prospects of web developers. These services include, but are not limited to, personalized coaching, skill assessment tools, and access to various resources and content.

  ### User Responsibilities

  - **Compliance with Terms**: When using ${
    organization.displayName
  }'s services, you agree to comply with these Terms of Use and all applicable laws, regulations, and policies.
  
  - **Content Use**: Any content provided as part of the services, including texts, graphics, logos, and software, is owned by ${
    organization.displayName
  } or its content suppliers and protected by international copyright laws. You agree not to reproduce, distribute, modify, or use any content without explicit permission from ${
    organization.displayName
  }.
  
  - **Prohibited Activities**: Users are prohibited from engaging in activities that:
    - Promote illegal activities or violate any applicable laws.
    - Infringe on the intellectual property rights of others or the privacy rights of any party.
    - Introduce viruses, worms, malware, or any other harmful code.
    - Attempt to gain unauthorized access to any part of the service or related systems or networks.

  ### Service Modifications and Availability

  ${
    organization.displayName
  } reserves the right, at its discretion, to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that ${
    organization.displayName
  } shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.

  We do not guarantee that the service will be available at all times. There may be instances where the service is unavailable due to technical issues or maintenance. We will strive to provide reasonable notice of any significant disruptions and restore the service as quickly as possible.

  ### Third-Party Services

  Our services may include links to third-party websites or services that are not owned or controlled by ${
    organization.displayName
  }. We are not responsible for the content, policies, or practices of any third-party websites or services. You acknowledge and agree that ${
    organization.displayName
  } shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
  
  ## Modification of Terms

  ${
    organization.displayName
  } reserves the right to update or modify these Terms of Use at any time without prior notice. Changes to the terms will become effective immediately upon posting on our website. It is your responsibility to review the Terms of Use periodically for updates or changes.

  To ensure that you are aware of any modifications, we will notify you of significant changes to these terms by sending an email to the address associated with your account, and/or by posting a prominent notice on our website.

  Your continued use of the service after such notifications of changes to the Terms of Use will constitute your acknowledgment of the modifications and your consent to abide and be bound by the updated Terms of Use. If you do not agree to the amended terms, you must stop using the services.
  
  ## Intellectual Property Rights

  The content, including but not limited to the text, graphics, images, logos, and software, hosted on ${
    organization.displayName
  }'s website and services, is the property of ${
    organization.displayName
  } or its licensors and is protected by copyright and other intellectual property laws both domestically and internationally.

  By using the Service, you agree that you will not copy, reproduce, alter, modify, or create derivative works from the Service without the prior written permission of ${
    organization.displayName
  }. The use of the content for any purpose not expressly permitted in these Terms of Use is strictly prohibited.

  ${
    organization.displayName
  } grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms of Use. This license does not include any resale or commercial use of any Service or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of any Service or its contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.

  All rights not expressly granted to you in these Terms of Use are reserved and retained by ${
    organization.displayName
  } or its licensors. No part of the Service, nor any use of the Service or access to the Service, may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, or distributed in any way to any other computer, server, website, or other medium for publication or distribution or for any commercial enterprise, without ${
    organization.displayName
  }'s express prior written consent.
  
  ## User-Generated Content

  On ${
    organization.displayName
  }, only coaches are permitted to post, submit, publish, display, or transmit content or materials (collectively, "User-Generated Content") to other users or persons through the Service. This is in line with our goal to maintain a high quality of content and ensure that all shared materials are relevant and beneficial to our community of web developers.

  By posting User-Generated Content on or through the Service, coaches represent and warrant that:
  - The content is original to them, and they own or control all rights in and to the User-Generated Content and have the right to grant the license granted below to ${
    organization.displayName
  }, its affiliates, and service providers.
  - The content does not violate the rights of any third party, including copyright, trademark, privacy, publicity, or other personal or proprietary rights.
  - The content does not contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.
  
  Coaches grant ${
    organization.displayName
  } and its affiliates and service providers the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material for any purpose related to the Service.

  ${
    organization.displayName
  } is not responsible or liable to any third party for the content or accuracy of any User-Generated Content posted by coaches or any other user of the Service.

  ${organization.displayName} reserves the right to:
  - Remove or refuse to post any User-Generated Content for any or no reason in our sole discretion.
  - Take any action with respect to any User-Generated Content that we deem necessary or appropriate if we believe that such User-Generated Content violates these Terms of Use, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Service or the public, or could create liability for ${
    organization.displayName
  }.
  - Disclose a coach's identity or other information to any third party who claims that material posted by the coach violates their rights, including their intellectual property rights or their right to privacy.
  
  We have the right to cooperate fully with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Service. COACHES WAIVE AND HOLD HARMLESS ${
    organization.displayName
  } FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ${
    organization.displayName
  } DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER ${
    organization.displayName
  } OR LAW ENFORCEMENT AUTHORITIES.

  ## Dispute Resolution
  
  Any disputes arising out of or related to these Terms of Use or the use of the ${
    organization.displayName
  } services shall first be attempted to be resolved through friendly negotiations directly between the parties. If the matter is not resolved through negotiation, it shall then be resolved by binding arbitration in the jurisdiction where ${
    organization.displayName
  } is located. The prevailing party in the arbitration shall be entitled to receive reimbursement of their reasonable expenses (including but not limited to attorneys' fees, arbitration fees, and court costs).

  ## Limitation of Liability
  
  To the maximum extent permitted by law, ${
    organization.displayName
  }, including its directors, employees, agents, partners, and licensors, shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the services; (ii) any conduct or content of any third party on the services; (iii) any content obtained from the services; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.

  ## Governing Law
  
  These Terms of Use and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Germany, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms of Use will not be considered a waiver of those rights. If any provision of these Terms of Use is held to be invalid or unenforceable by a court, the remaining provisions of these Terms of Use will remain in effect.`,
  de: (organization) => `## Einleitung

  Willkommen bei den Allgemeinen Geschäftsbedingungen für ${
    organization.legalName
  } (im Folgenden als "${
    organization.displayName
  }") . Diese Bedingungen regeln Ihre Nutzung unserer Website und Dienste, einschließlich aller Inhalte, Funktionen und Dienste, die auf oder über https://${
    organization.domain || `octo.coach/org/${organization.slug}`
  }.
  
  Indem Sie auf den Dienst zugreifen oder ihn nutzen, erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.
  
  Diese Nutzungsbedingungen gelten für alle Benutzer der Website, einschließlich, aber nicht beschränkt auf Benutzer, die Browser, Verkäufer, Kunden, Händler und/oder Autoren von Inhalten sind.
  
  Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, bevor Sie auf unsere Website zugreifen oder sie nutzen. Durch den Zugriff auf die Website oder die Nutzung eines Teils der Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn diese Nutzungsbedingungen als ein Angebot betrachtet werden, ist die Annahme ausdrücklich auf diese Nutzungsbedingungen beschränkt.
  
  Alle neuen Funktionen oder Tools, die dem aktuellen Service hinzugefügt werden, unterliegen ebenfalls den Servicebedingungen. Sie können die aktuellste Version der Servicebedingungen jederzeit auf dieser Seite einsehen. Wir behalten uns das Recht vor, jeden Teil dieser Servicebedingungen zu aktualisieren, zu ändern oder zu ersetzen, indem wir Aktualisierungen und/oder Änderungen auf unserer Website veröffentlichen. Es liegt in Ihrer Verantwortung, diese Seite regelmäßig auf Änderungen zu überprüfen. Wenn Sie die Website nach der Veröffentlichung von Änderungen weiterhin nutzen oder darauf zugreifen, erklären Sie sich mit diesen Änderungen einverstanden.
  
  **Kontaktinformationen**:
  
  Wenn Sie Fragen zu den Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter:
  
  E-Mail: ${organization.email}
  Telefon: ${organization.phone}
  
  ## Kontoregistrierung und Nutzung

  Um auf bestimmte Funktionen oder Bereiche unserer Website zugreifen zu können, müssen Sie möglicherweise ein Konto bei ${
    organization.displayName
  }. In diesem Fall verpflichten Sie sich, genaue, aktuelle und vollständige Angaben zu Ihrer Person zu machen, wie sie in unseren Registrierungsformularen abgefragt werden. Es liegt in Ihrer Verantwortung, diese Informationen korrekt und auf dem neuesten Stand zu halten.

  Sie sind verantwortlich für die Geheimhaltung Ihrer Kontoinformationen, einschließlich Ihres Passworts, und für alle Aktivitäten, die unter Ihrem Konto stattfinden. Sie verpflichten sich, ${
    organization.displayName
  } unverzüglich über jede unbefugte Nutzung Ihres Kontos oder jede andere Verletzung der Sicherheit zu informieren.

  ${
    organization.displayName
  } behält sich das Recht vor, nach eigenem Ermessen Dienste zu verweigern, Konten zu kündigen, Inhalte zu entfernen oder zu bearbeiten oder Bestellungen zu stornieren.

  Benutzer dürfen unsere Dienste nicht für illegale oder nicht genehmigte Zwecke nutzen und dürfen bei der Nutzung des Dienstes nicht gegen die in ihrem Land geltenden Gesetze verstoßen (einschließlich, aber nicht beschränkt auf Urheberrechtsgesetze).

  Durch die Erstellung eines Kontos bestätigen Sie, dass Sie mindestens 16 Jahre alt sind. Der Service ist für Personen unter 16 Jahren nicht verfügbar. Es liegt in Ihrer Verantwortung, sicherzustellen, dass Sie diese Altersvoraussetzung erfüllen.

  ## Nutzung der Dienste

  ${
    organization.displayName
  } bietet eine Reihe von Dienstleistungen an, die darauf abzielen, die Karriereaussichten von Webentwicklern zu verbessern. Diese Dienste umfassen unter anderem persönliches Coaching, Tools zur Bewertung von Fähigkeiten und Zugang zu verschiedenen Ressourcen und Inhalten.

  ### Verantwortlichkeiten des Benutzers

  - **Einhaltung der Bedingungen**: Bei der Verwendung von ${
    organization.displayName
  } nutzen, erklären Sie sich damit einverstanden, diese Nutzungsbedingungen sowie alle geltenden Gesetze, Vorschriften und Richtlinien einzuhalten.
  
  - **Nutzung von Inhalten**: Alle Inhalte, die im Rahmen der Dienste bereitgestellt werden, einschließlich Texten, Grafiken, Logos und Software, sind Eigentum von ${
    organization.displayName
  } oder seinen Inhaltslieferanten und ist durch internationale Urheberrechtsgesetze geschützt. Sie verpflichten sich, keine Inhalte ohne ausdrückliche Genehmigung von ${
    organization.displayName
  }.
  
  - **Verbotene Aktivitäten**: Benutzern ist es untersagt, sich an Aktivitäten zu beteiligen, die:
    - Illegale Aktivitäten zu fördern oder gegen geltende Gesetze zu verstoßen.
    - die geistigen Eigentumsrechte anderer oder die Datenschutzrechte einer Partei verletzen.
    - Viren, Würmer, Malware oder andere schädliche Codes einzuschleusen.
    - Versuchen, sich unbefugten Zugang zu einem Teil des Dienstes oder der damit verbundenen Systeme oder Netzwerke zu verschaffen.

  ### Änderungen und Verfügbarkeit des Dienstes

  ${
    organization.displayName
  } behält sich das Recht vor, den Dienst (oder Teile davon) nach eigenem Ermessen mit oder ohne vorherige Ankündigung vorübergehend oder dauerhaft zu ändern oder einzustellen. Sie erklären sich damit einverstanden, dass ${
    organization.displayName
  } Ihnen oder einem Dritten gegenüber nicht für eine Änderung, Aussetzung oder Einstellung des Dienstes haftet.

  Wir garantieren nicht, dass der Dienst jederzeit verfügbar sein wird. Es kann vorkommen, dass der Dienst aufgrund von technischen Problemen oder Wartungsarbeiten nicht verfügbar ist. Wir bemühen uns, Sie in angemessener Zeit über erhebliche Unterbrechungen zu informieren und den Dienst so schnell wie möglich wiederherzustellen.

  ### Dienste von Drittanbietern

  Unsere Dienste können Links zu Websites oder Diensten Dritter enthalten, die nicht im Besitz oder unter der Kontrolle von ${
    organization.displayName
  }. Wir sind nicht verantwortlich für die Inhalte, Richtlinien oder Praktiken von Websites oder Diensten Dritter. Sie erkennen an und stimmen zu, dass ${
    organization.displayName
  } weder direkt noch indirekt für Schäden oder Verluste verantwortlich oder haftbar ist, die durch oder in Verbindung mit der Nutzung von oder dem Vertrauen auf solche Inhalte, Waren oder Dienste, die auf oder über solche Websites oder Dienste verfügbar sind, verursacht wurden oder angeblich verursacht wurden.
  
  ## Änderung der Bedingungen

  ${
    organization.displayName
  } behält sich das Recht vor, diese Nutzungsbedingungen jederzeit und ohne vorherige Ankündigung zu aktualisieren oder zu ändern. Änderungen an den Bedingungen treten sofort nach Veröffentlichung auf unserer Website in Kraft. Es liegt in Ihrer Verantwortung, die Nutzungsbedingungen regelmäßig auf Aktualisierungen oder Änderungen zu überprüfen.

  Um sicherzustellen, dass Sie über alle Änderungen informiert sind, werden wir Sie über wesentliche Änderungen dieser Bedingungen informieren, indem wir eine E-Mail an die mit Ihrem Konto verknüpfte Adresse senden und/oder einen deutlichen Hinweis auf unserer Website veröffentlichen.

  Ihre fortgesetzte Nutzung des Dienstes nach einer solchen Benachrichtigung über Änderungen der Nutzungsbedingungen gilt als Anerkennung der Änderungen und als Ihr Einverständnis, die aktualisierten Nutzungsbedingungen einzuhalten und an sie gebunden zu sein. Wenn Sie mit den geänderten Bedingungen nicht einverstanden sind, müssen Sie die Nutzung der Dienste einstellen.
  
  ## Geistige Eigentumsrechte

  Der Inhalt, einschließlich, aber nicht beschränkt auf die Texte, Grafiken, Bilder, Logos und Software, die auf ${
    organization.displayName
  } gehostet werden, sind das Eigentum von ${
    organization.displayName
  } oder seinen Lizenzgebern und ist durch das Urheberrecht und andere Gesetze zum Schutz des geistigen Eigentums sowohl im Inland als auch international geschützt.

  Durch die Nutzung des Dienstes erklären Sie sich damit einverstanden, den Dienst nicht zu kopieren, zu vervielfältigen, zu verändern, zu modifizieren oder davon abgeleitete Werke zu erstellen ohne die vorherige schriftliche Genehmigung von ${
    organization.displayName
  }. Die Nutzung der Inhalte für Zwecke, die nicht ausdrücklich in diesen Nutzungsbedingungen erlaubt sind, ist strengstens untersagt.

  ${
    organization.displayName
  } gewährt Ihnen eine eingeschränkte, nicht exklusive, nicht übertragbare und widerrufliche Lizenz für den Zugriff auf den Dienst und dessen Nutzung in Übereinstimmung mit den vorliegenden Nutzungsbedingungen. Diese Lizenz umfasst nicht den Weiterverkauf oder die kommerzielle Nutzung eines Dienstes oder seiner Inhalte, die Sammlung und Nutzung von Produktlisten, -beschreibungen oder -preisen, die abgeleitete Nutzung eines Dienstes oder seiner Inhalte, das Herunterladen oder Kopieren von Kontoinformationen zugunsten eines anderen Händlers oder die Nutzung von Data Mining, Robotern oder ähnlichen Tools zur Datensammlung und -extraktion.

  Alle Rechte, die Ihnen in diesen Nutzungsbedingungen nicht ausdrücklich gewährt werden, bleiben ${
    organization.displayName
  } oder seinen Lizenzgebern vorbehalten. Weder Teile des Dienstes noch die Nutzung des Dienstes oder der Zugriff auf den Dienst dürfen kopiert, reproduziert, wiederveröffentlicht, hochgeladen, gepostet, öffentlich ausgestellt, kodiert, übersetzt, übertragen oder in irgendeiner Weise auf einen anderen Computer, Server, eine Website oder ein anderes Medium zur Veröffentlichung oder Verteilung oder für ein kommerzielles Unternehmen verteilt werden, ohne ${
    organization.displayName
  }s ausdrückliche vorherige schriftliche Zustimmung.
  
  ## Benutzergenerierte Inhalte

  Auf ${
    organization.displayName
  } ist es nur Trainern gestattet, Inhalte oder Materialien (zusammenfassend als "nutzergenerierte Inhalte" bezeichnet) an andere Nutzer oder Personen über den Dienst zu posten, zu übermitteln, zu veröffentlichen, anzuzeigen oder zu übertragen. Dies entspricht unserem Ziel, eine hohe Qualität der Inhalte aufrechtzuerhalten und sicherzustellen, dass alle freigegebenen Materialien für unsere Gemeinschaft von Webentwicklern relevant und nützlich sind.

  Indem Sie nutzergenerierte Inhalte im oder über den Dienst veröffentlichen, erklären und garantieren Sie, dass:
  - Der Inhalt stammt von ihnen, und sie besitzen oder kontrollieren alle Rechte an den nutzergenerierten Inhalten und haben das Recht, die nachstehend gewährte Lizenz an ${
    organization.displayName
  }, deren Tochtergesellschaften und Dienstleistern zu gewähren.
  - Die Inhalte verletzen nicht die Rechte Dritter, einschließlich Urheberrechte, Markenrechte, Datenschutzrechte, Publizitätsrechte oder andere persönliche oder Eigentumsrechte.
  - Der Inhalt enthält kein verleumderisches, obszönes, unanständiges, beleidigendes, anstößiges, belästigendes, gewalttätiges, hasserfülltes, aufrührerisches oder anderweitig anstößiges Material.
  
  Coaches gewähren ${
    organization.displayName
  } und den mit ihr verbundenen Unternehmen und Dienstleistern das Recht, solches Material für jegliche Zwecke im Zusammenhang mit dem Dienst zu verwenden, zu reproduzieren, zu modifizieren, vorzuführen, auszustellen, zu verbreiten und anderweitig an Dritte weiterzugeben.

  ${
    organization.displayName
  } ist nicht verantwortlich oder haftbar gegenüber Dritten für den Inhalt oder die Richtigkeit von nutzergenerierten Inhalten, die von Trainern oder anderen Nutzern des Dienstes veröffentlicht werden.

  ${organization.displayName} behält sich das Recht vor:
  - Benutzergenerierte Inhalte nach eigenem Ermessen zu entfernen oder deren Veröffentlichung zu verweigern, ganz gleich aus welchem Grund.
  - Alle Maßnahmen in Bezug auf nutzergenerierte Inhalte zu ergreifen, die wir für notwendig oder angemessen halten, wenn wir der Meinung sind, dass diese nutzergenerierten Inhalte gegen diese Nutzungsbedingungen verstoßen, ein geistiges Eigentumsrecht oder ein anderes Recht einer natürlichen oder juristischen Person verletzen, die persönliche Sicherheit von Nutzern des Dienstes oder der Öffentlichkeit gefährden oder eine Haftung für ${
    organization.displayName
  }.
  - die Identität eines Trainers oder andere Informationen an Dritte weitergeben, die behaupten, dass das von dem Trainer eingestellte Material ihre Rechte, einschließlich ihrer Rechte an geistigem Eigentum oder ihr Recht auf Privatsphäre, verletzt.
  
  Wir haben das Recht, in vollem Umfang mit Strafverfolgungsbehörden oder Gerichtsbeschlüssen zu kooperieren, die uns auffordern oder anweisen, die Identität oder andere Informationen von Personen preiszugeben, die Materialien in oder über den Service veröffentlichen. TRAINER VERZICHTEN UND HALTEN ${
    organization.displayName
  } VON JEGLICHEN ANSPRÜCHEN, DIE SICH AUS EINER HANDLUNG VON ${
    organization.displayName
  } WÄHREND ODER ALS FOLGE VON UNTERSUCHUNGEN VON ${
    organization.displayName
  } ODER STRAFVERFOLGUNGSBEHÖRDEN.

  ## Streitschlichtung
  
  Jegliche Streitigkeiten, die sich aus oder im Zusammenhang mit diesen Nutzungsbedingungen oder der Nutzung der ${
    organization.displayName
  } Dienstleistungen entstehen, sollen zunächst durch freundschaftliche Verhandlungen direkt zwischen den Parteien beigelegt werden. Wenn die Angelegenheit nicht durch Verhandlungen gelöst werden kann, wird sie durch ein verbindliches Schiedsverfahren in der Gerichtsbarkeit gelöst, in der ${
    organization.displayName
  } ansässig ist. Die im Schiedsverfahren obsiegende Partei hat Anspruch auf Erstattung ihrer angemessenen Kosten (einschließlich, aber nicht beschränkt auf Anwalts-, Schieds- und Gerichtskosten).

  ## Haftungsbeschränkung
  
  Im größtmöglichen gesetzlich zulässigen Umfang ist ${
    organization.displayName
  }, einschließlich seiner Direktoren, Mitarbeiter, Vertreter, Partner und Lizenzgeber, nicht für indirekte, zufällige, besondere oder Folgeschäden, einschließlich, aber nicht beschränkt auf entgangene Gewinne, Daten, Nutzung, Firmenwert oder andere immaterielle Verluste, die sich aus (i) Ihrem Zugriff auf die Dienste oder deren Nutzung oder der Unfähigkeit, auf die Dienste zuzugreifen oder diese zu nutzen, ergeben; (ii) jeglichem Verhalten oder Inhalt von Dritten in den Diensten; (iii) jeglichem Inhalt, der von den Diensten bezogen wurde; und (iv) unbefugtem Zugriff, Nutzung oder Veränderung Ihrer Übertragungen oder Inhalte, unabhängig davon, ob diese auf einer Garantie, einem Vertrag, einer unerlaubten Handlung (einschließlich Fahrlässigkeit) oder einer anderen Rechtstheorie beruhen, und unabhängig davon, ob wir über die Möglichkeit eines solchen Schadens informiert wurden oder nicht.

  ## Geltendes Recht
  
  Diese Nutzungsbedingungen und alle separaten Vereinbarungen, mit denen wir Ihnen Dienstleistungen zur Verfügung stellen, unterliegen den Gesetzen Deutschlands und sind entsprechend auszulegen, ungeachtet der Bestimmungen des Kollisionsrechts. Wenn wir es unterlassen, ein Recht oder eine Bestimmung dieser Nutzungsbedingungen durchzusetzen, gilt dies nicht als Verzicht auf diese Rechte. Sollte eine Bestimmung dieser Nutzungsbedingungen von einem Gericht für ungültig oder nicht durchsetzbar erklärt werden, bleiben die übrigen Bestimmungen dieser Nutzungsbedingungen in Kraft.`,
};
