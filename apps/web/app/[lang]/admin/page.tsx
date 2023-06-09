"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import Link from "@app/link";

export default function Page() {
  const { LL } = useI18nContext();
  return (
    <section>
      <Link href="/admin/accreditation">{LL.ACCREDITATION()}</Link>
    </section>
  );
}
