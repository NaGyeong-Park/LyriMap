"use client";
import Link from "next/link";
import { Map } from "@/components/Map";
import { InfoWindowTemplate } from "@/components/InfoWindowTemplate";
import styles from "@/app/page.module.css";
interface Location {
  name: string;
  position: { lat: number; lng: number };
}

const locationData: Location[] = [
  {
    name: "한남동 유엔빌리지",
    position: { lat: 37.5341302, lng: 127.0103962 },
    // songName: "UNVillage",
    // lyrics: "한남동 유엔빌리지 언덕에서 달을 보며",
    // albumImage: "http://i.maniadb.com/images/album/799/799728_1_f.jpg",
  },
  {
    name: "독서당 어린이 공원",
    position: { lat: 37.5345194, lng: 127.01252 },
    // songName: "UNVillage",
    // lyrics: "네비게이션 독서당 어린이 공원으로 누르고 엑셀을 밟아",
    // albumImage: "http://i.maniadb.com/images/album/799/799728_1_f.jpg",
  },
];

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>LyricMap</h1>
        <Link href={"/auth/login"}>로그인</Link>
      </header>
      <main className={styles.main}>
        <Map locations={locationData} infoWindowTemplate={InfoWindowTemplate} />
      </main>
    </div>
  );
}
