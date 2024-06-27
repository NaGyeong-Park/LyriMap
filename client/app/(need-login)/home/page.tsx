import { auth, signOut } from "@/auth";

export default async function AuthHome() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
