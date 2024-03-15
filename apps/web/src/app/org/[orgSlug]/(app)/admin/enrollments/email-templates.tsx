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
        Thank you for applying for <b>{measureTitle}</b>. After looking at your
        applicaion, it seems that this might be a suitable measure for you.
      </p>
      <p>
        I would like to invite you to join a video call with me to discuss next
        steps.
      </p>
      <p>
        Please{" "}
        <a href={`${rootDomain}/measures/${measureId}/apply`}>click here</a> to
        schedule a call
      </p>
      <p>I&apos;m looking forward to speaking with you soon.</p>
      <p>
        Kind Regards,
        <br />
        {coachName}
      </p>
    </div>
  );
};
