import { login } from "@/actions/login";
import styles from "./SocialLogin.module.css";
import Image from "next/image";

export function SocialLogin() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const provider = formData.get("provider");
        if (!provider) {
          alert("오류가 발생했습니다. 관리자에게 문의해주세요.");
          return;
        }
        await login(provider.toString());
      }}
    >
      <div className={styles.wrappper}>
        <button name="provider" value="google" className={`${styles.button} ${styles.google}`} type="submit">
          <Image src="/google-logo.svg" alt="google-logo" width={40} height={40} />
          구글 아이디로 로그인
        </button>
        <button name="provider" value="naver" className={`${styles.button} ${styles.naver}`}>
          <Image src="/naver-logo.svg" alt="google-logo" width={40} height={40} />
          네이버 아이디로 로그인
        </button>
        <button name="provider" value="kakao" className={`${styles.button} ${styles.kakao}`}>
          <Image src="/kakao-logo.svg" alt="google-logo" width={40} height={40} />
          카카오 아이디로 로그인
        </button>
      </div>
    </form>
  );
}
