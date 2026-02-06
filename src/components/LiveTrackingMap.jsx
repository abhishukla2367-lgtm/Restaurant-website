import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* Fix default marker icons (important for React) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LiveTrackingMap = () => {
  const customerLocation = [28.6139, 77.209]; // Delhi example

  const [deliveryLocation, setDeliveryLocation] = useState([
    28.6239,
    77.219,
  ]);

  // Simulate live movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryLocation((prev) => [
        prev[0] - 0.0003,
        prev[1] - 0.0003,
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-gray-700 mb-2">
        Live Delivery Tracking
      </h3>

      <div className="h-[280px] rounded-xl overflow-hidden border">
        <MapContainer
          center={deliveryLocation}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Customer */}
          <Marker position={customerLocation}>
            <Popup>Your location</Popup>
          </Marker>

          {/* Delivery Partner */}
          <Marker position={deliveryLocation}>
            <Popup>Delivery partner 🚴</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveTrackingMap;
