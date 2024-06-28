"use client";
import { useEffect, useRef, useState } from "react";
import { Marker } from "./Marker";
import { Wrapper } from "@googlemaps/react-wrapper";
import styles from "@/components/Map.module.css";
const mapOptions: google.maps.MapOptions = {
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
  center: { lat: 37.5341302, lng: 127.0103962 },
  zoom: 15,
  disableDefaultUI: true,
  gestureHandling: "greedy",
  clickableIcons: false,
};

function InnerMap({
  locations,
  infoWindowTemplate,
}: {
  locations?: {
    name: string;
    position: google.maps.LatLngLiteral;
  }[];
  infoWindowTemplate: ({ name }: { name: string }) => JSX.Element;
}) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, [ref]);

  return (
    <div className={styles.wrapper}>
      <div ref={ref} id="map" className={styles.map} />
      {map &&
        locations &&
        locations.map((location) => {
          const InfoWindowTemplate = infoWindowTemplate;
          return (
            <Marker key={location.name} map={map} position={location.position}>
              <InfoWindowTemplate name={location.name} />
            </Marker>
          );
        })}
    </div>
  );
}

export function Map({
  locations,
  infoWindowTemplate,
}: {
  locations?: {
    name: string;
    position: { lat: number; lng: number };
  }[];
  infoWindowTemplate: ({ name }: { name: string }) => JSX.Element;
}) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""} version="beta" libraries={["marker"]}>
      <InnerMap locations={locations} infoWindowTemplate={infoWindowTemplate} />
    </Wrapper>
  );
}
