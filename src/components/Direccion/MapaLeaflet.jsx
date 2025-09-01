import React, {useState ,useRef, useEffect}from 'react'
import {MapContainer,TileLayer, Marker,useMapEvents,Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {IconoDireccion} from '../Direccion/IconoDireccion'
import {venues} from '../../assets/data.json'
import { use } from 'react';
function MapaLeaflet() {

  const [featureMapContainer, setFeatureMapContainer] =useState(
    {longitud:-25.2637, 
      latitud:-57.5759,
    zoom:18});// Posición inicial (Paraguay)

    const marketRef = useRef(null);

     const [clickedPosition, setClickedPosition] = useState(null);

      useEffect(() => {
        if (marketRef.current) {
          marketRef.current.openPopup();
        }
      }, [clickedPosition]);
     function LocationMarker() {
      const map = useMapEvents({
        click(e) {
          setClickedPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
      });
    
      return clickedPosition === null ? null : (
        <Marker 
        
        position={clickedPosition} icon={IconoDireccion} ref={marketRef}>
              <Popup>
          <div>
            <h3>Descripción del lugar</h3>
            <p>Este es un punto interesante en el mapa.</p>
          </div>
        </Popup>
        </Marker>
      );
    }

  return (
    <div>

    <MapContainer
      center={[ featureMapContainer.longitud, featureMapContainer.latitud ]} // Paraguay, ejemplo
      zoom={featureMapContainer.zoom} // Zoom inicial reducido
      style={{ height: "900px", width: "100%" }} // Tamaño moderado para menos tiles
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={["a", "b", "c"]} // Subdominios para paralelizar la descarga
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />


{venues.map((venue,i) => (
  <Marker key={i} position={venue.geometry} icon={IconoDireccion}>
  </Marker>
))}
      <LocationMarker />
    </MapContainer>
    </div>
  )
}

export default MapaLeaflet
