import { UserInfo } from "@/components/user-info";
import { getUser } from "@/actions/getUser";

const ServerPage = async () => {
  const {user} = await getUser();

  return ( 
    <UserInfo
      label="💻 Server components"
      user={user?.user}
    />
   );
}
 
export default ServerPage;