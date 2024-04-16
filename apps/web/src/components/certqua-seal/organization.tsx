import Image from "next/image";

import seal from "./assets/certqua_org_s.png";

export const CertquaOrgSeal = () => (
  <Image src={seal.src} height={200} width={200} alt="Seal" />
);
