import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix default marker icons under bundlers
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

export default function MapView({ markers = [], center, zoom = 11, className = "h-80 w-full" }) {
  const fallbackCenter = center || (markers[0] ? [markers[0].lat, markers[0].lng] : [25.2048, 55.2708])

  return (
    <div className={className}>
      <MapContainer
        center={fallbackCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            {m.label && (
              <Popup>
                <span className="font-medium">{m.label}</span>
                {m.sub && <div className="text-xs text-neutral-500">{m.sub}</div>}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
