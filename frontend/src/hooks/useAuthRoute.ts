import { AuthContext } from "@/providers/Auth";
import { setupResponseInterceptor } from "@/services";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function useAuthRoute() {
  const { user, isLoading } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!localStorage.getItem("notify@user") || !user)) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  setupResponseInterceptor(router);

  return;
}
