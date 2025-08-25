import React from 'react'
import {MapContainer,TileLayer, Marker} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
function MapaLeaflet() {
  return (
    <div>

    <MapContainer
      center={[ -25.2637, -57.5759 ]} // Paraguay, ejemplo
      zoom={18} // Zoom inicial reducido
      style={{ height: "900px", width: "100%" }} // Tamaño moderado para menos tiles
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={["a", "b", "c"]} // Subdominios para paralelizar la descarga
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

<Marker position={[-25.280644025569224, -57.54357593548317]} icon={L.icon({iconUrl, iconSize: [25, 41], iconAnchor: [12, 41]})}></Marker>
    </MapContainer>

    </div>
  )
}

export default MapaLeaflet
