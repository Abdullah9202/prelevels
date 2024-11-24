import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";
import { useSignIn } from "../hooks/userSignedIn";
import { usePasswordStore } from "../hooks/usePassword";

const useHandleLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.status === 404) {
        console.warn("User session not found (404). Logging out automatically.");
        triggerLogout();
      } else if (res.ok) {
        const data = await res.json();
        if (data?.status === 200) {
          console.log("Logout successful.");
          triggerLogout();
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

    function triggerLogout() {
      useUser.getState().setUser(null);
      useSignIn.getState().setSignedIn(false);
      usePasswordStore.getState().clearPassword();
      router.push("/");
    }
  };

  return handleLogout;
};

export default useHandleLogout;
