import { withAuth } from "@components/withAuth";
import { NewOrganization } from "./new";

export default withAuth(Page);
function Page() {
  return <NewOrganization />;
}
