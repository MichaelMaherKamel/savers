import { getCurrentUser } from "@/db/actions/auth";
import UsersTable from "@/components/admin/users/UsersTable";

export default async function AdminUsersPage() {
  // Only get the current user ID on the server
  const user = await getCurrentUser();
  const currentUserId = user?.id || "";
  
  return (
  <UsersTable currentUserId={currentUserId} />
  )    
}