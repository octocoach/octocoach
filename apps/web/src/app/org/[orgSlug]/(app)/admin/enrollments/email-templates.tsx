export const EnrollmentTemplate = ({
  firstName,
  coachName,
  measureTitle,
  measureId,
  domain,
  orgSlug,
}: {
  firstName: string | null;
  coachName: string;
  measureTitle: string;
  measureId: string;
  domain: string | null;
  orgSlug: string;
}) => {
  const rootDomain = domain
    ? `https://${domain}`
    : `https://octo.coach/org/${orgSlug}`;

  return (
    <div>
      <p>Hey {firstName || "there"},</p>
      <p>
        🎉 <b>We&apos;re thrilled about your interest in {measureTitle}!</b> 🎉
      </p>
      <p>
        Your application caught our eye, and it looks like this could be the
        perfect fit for you.
      </p>
      <p>
        Let&apos;s chat and carve out your next steps. Shall we? Schedule a
        video call with me, and we’ll dive into the exciting details together.
      </p>
      <p>
        👉{" "}
        <a href={`${rootDomain}/measures/${measureId}/apply`}>
          Schedule Our Chat
        </a>
      </p>
      <p>Can&apos;t wait to connect and kickstart this journey with you.</p>
      <p>
        Kind Regards,
        <br />
        {coachName}
      </p>
    </div>
  );
};
