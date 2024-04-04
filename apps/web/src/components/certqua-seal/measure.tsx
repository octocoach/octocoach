import Image from "next/image";
import seal from "./assets/certqua_measure_l.png";

export const CertquaMeasureSeal = () => (
  <Image
    src={seal.src}
    alt="Certification Seal"
    height={seal.height / 4}
    width={seal.width / 4}
  />
);
