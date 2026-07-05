"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type CenterOption = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
};

export function CenterPicker({
  centers,
  selectedCenterId,
  onSelect,
}: {
  centers: CenterOption[];
  selectedCenterId?: string;
  onSelect: (centerId: string) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const bounds = useMemo(() => {
    if (!centers.length) return null;
    const mapBounds = new mapboxgl.LngLatBounds();
    centers.forEach((center) => mapBounds.extend([center.lng, center.lat]));
    return mapBounds;
  }, [centers]);

  useEffect(() => {
    if (!token || !mapRef.current || !centers.length) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [78.9629, 22.5937],
      zoom: 3.6,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    if (bounds) map.fitBounds(bounds, { padding: 70, maxZoom: 10 });

    markersRef.current = centers.map((center) => {
      const markerNode = document.createElement("button");
      markerNode.type = "button";
      markerNode.className =
        "grid h-9 w-9 place-items-center rounded-full bg-teal-500 text-white shadow-soft ring-4 ring-white transition hover:bg-navy-900";
      markerNode.setAttribute("aria-label", `Select ${center.name}`);
      markerNode.innerHTML =
        '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
      markerNode.addEventListener("click", () => onSelect(center.id));

      return new mapboxgl.Marker(markerNode)
        .setLngLat([center.lng, center.lat])
        .setPopup(new mapboxgl.Popup({ offset: 20 }).setText(`${center.name}, ${center.city}`))
        .addTo(map);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
    };
  }, [bounds, centers, onSelect, token]);

  if (!token) {
    return (
      <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-gradient p-5 text-white shadow-card">
        <div className="absolute inset-x-10 top-10 h-72 rounded-[45%] border border-white/15 bg-white/5" />
        <div className="relative z-10 grid gap-3 sm:grid-cols-2">
          {centers.map((center) => (
            <button
              key={center.id}
              type="button"
              onClick={() => onSelect(center.id)}
              className={cn(
                "rounded-2xl border border-white/15 bg-white/10 p-4 text-left transition hover:bg-white/15",
                selectedCenterId === center.id && "border-teal-400 bg-teal-500/25"
              )}
            >
              <MapPin className="mb-3 h-5 w-5 text-teal-300" />
              <p className="font-semibold">{center.name}</p>
              <p className="mt-1 text-sm text-white/70">
                {center.city}, {center.state}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="min-h-[420px] overflow-hidden rounded-2xl border border-navy-900/10 shadow-card" />;
}
