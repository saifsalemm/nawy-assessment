import AddUnit from "@/components/AddUnit";
import { getMetadata } from "@/utils/getMetadataServerFn";

export default async function page() {
  const metadata = await getMetadata();
  return <AddUnit metadata={metadata} />;
}
