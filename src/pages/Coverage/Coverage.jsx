import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const warehouses = useLoaderData();
  const mapRef = useRef(null)
  const searchHandler = (e) => {
    e.preventDefault();
    const location = e.target.location.value
    const district = warehouses.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
    if(district){
      const coordinates = [district.latitude, district.longitude]
      console.log(district, coordinates)
      mapRef.current.flyTo(coordinates, 14)
    }
  }
  return (
    <div className="bg-base-100 rounded-4xl margin-bottom mt-6 box-padding">
      <h2 className="text-6xl font-extrabold text-secondary">
        We are available in 64 districts
      </h2>
      <form onSubmit={searchHandler} className="flex items-center gap-2 bg-gray-200 max-w-1/3 h-10 rounded-full pl-4 my-8">
        <FiSearch />
        <input
          className="flex-1 focus:outline-0"
          type="text"
          name="location"
          placeholder="search here"
        />
        <button type="submit" className="btn bg-primary rounded-full px-6">
          Search
        </button>
      </form>
      <p className="text-3xl font-extrabold text-secondary py-8 border-t border-accent/20">
        We are available in 64 districts
      </p>
      <div>
        <MapContainer
          className="h-[600px]"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warehouses.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> 
                Service Area: {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
