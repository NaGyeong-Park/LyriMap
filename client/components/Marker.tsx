"use client";
import { ReactElement, useEffect, useRef } from "react";
import { Root, createRoot } from "react-dom/client";

export function Marker({
  map,
  position,
  children,
  onClick,
}: {
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
  children: ReactElement;
  onClick?: () => void;
}) {
  const rootRef = useRef<Root>();
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>();
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const infoRef = useRef<Root>();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      const infoContainer = document.createElement("div");
      rootRef.current = createRoot(container);
      infoRef.current = createRoot(infoContainer);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        gmpClickable: true,
      });
      infoWindowRef.current = new google.maps.InfoWindow({
        content: container,
      });
    }

    return () => {
      markerRef.current.map = undefined;
    };
  }, [position]);

  useEffect(() => {
    rootRef.current?.render(children);
    infoRef.current?.render(children);
    const clickListener = markerRef.current?.addListener("gmp-click", () => {
      map.panTo(position);
      infoWindowRef.current?.close();
      infoWindowRef.current?.open({ anchor: markerRef.current, map });
      if (onClick) {
        onClick();
      }
    });

    if (markerRef.current) {
      markerRef.current.position = position;
      markerRef.current.map = map;
    }
    return () => {
      clickListener?.remove();
    };
  }, [map, position, children, onClick]);
  return null;
}
