"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type Props = {
    onConfirm: (
        lat: number,
        lng: number,
        address: string
    ) => void;
};

function RecenterMap({
    lat,
    lng,
}: {
    lat: number;
    lng: number;
}) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], 17);
    }, [lat, lng, map]);

    return null;
}

export default function MapPicker({
    onConfirm,
}: Props) {
    const [position, setPosition] =
    useState<[number, number]>([
        28.6139,
        77.209,
    ]);

    const [address, setAddress] =
    useState("Detecting location...");

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                setPosition([lat, lng]);

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );

                    const data =
                    await response.json();

                    setAddress(
                        data.display_name ||
                        "Location selected"
                    );
                } catch {
                    setAddress(
                        `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                    );
                }

                setLoading(false);
            },
            () => {
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);

    function DraggableMarker() {
        const map = useMapEvents({
            click: async (e) => {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;

                setPosition([lat, lng]);

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );

                    const data =
                    await response.json();

                    setAddress(
                        data.display_name ||
                        "Location selected"
                    );
                } catch {
                    setAddress(
                        `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                    );
                }

                map.flyTo([lat, lng], 18);
            },
        });

        return (
            <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                dragend: async (e) => {
                    const marker =
                    e.target;

                    const lat =
                    marker.getLatLng().lat;

                    const lng =
                    marker.getLatLng().lng;

                    setPosition([lat, lng]);

                    try {
                        const response =
                        await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                        );

                        const data =
                        await response.json();

                        setAddress(
                            data.display_name ||
                            "Location selected"
                        );
                    } catch {
                        setAddress(
                            `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                        );
                    }
                },
            }}
            />
        );
    }

    return (
        <div className="space-y-4">

        <MapContainer
        center={position}
        zoom={17}
        style={{
            height: "400px",
            width: "100%",
        }}
        >
        <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap
        lat={position[0]}
        lng={position[1]}
        />

        <DraggableMarker />
        </MapContainer>

        <div className="bg-zinc-800 p-4 rounded-lg">

        <p className="font-semibold">
        Selected Location
        </p>

        <p className="text-zinc-300 text-sm mt-2">
        {address}
        </p>

        <p className="text-zinc-500 text-xs mt-2">
        {position[0].toFixed(6)},
            {" "}
            {position[1].toFixed(6)}
            </p>

            </div>

            <button
            type="button"
            onClick={() =>
                onConfirm(
                    position[0],
                    position[1],
                    address
                )
            }
            className="w-full bg-green-600 py-3 rounded-xl font-bold"
            >
            ✅ Confirm Location
            </button>

            </div>
    );
}
