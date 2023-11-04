import { Text } from "../Text/Text";
import { logo, logoWrapper, nav } from "./nav.css";

export const Nav = ({
  logoSrc,
  displayName,
}: {
  logoSrc: string;
  displayName: string;
}) => {
  return (
    <nav className={nav}>
      <div className={logoWrapper}>
        <img src={logoSrc} className={logo} />
        <Text size="l" variation="heading">
          {displayName}
        </Text>
      </div>
    </nav>
  );
};
