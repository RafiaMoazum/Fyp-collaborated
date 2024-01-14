import React, { useEffect } from "react";

export default function SimpleMap({ hostelCoordinates }) {
  useEffect(() => {
    console.log("Hostel Coordinates:", hostelCoordinates);

    // Checking if the Google Maps API is available
    if (window.google) {
      console.log("Google Maps API is available");

      // Checking if hostelCoordinates is a non-empty string
      if (hostelCoordinates && typeof hostelCoordinates === "string") {
        console.log("hostelCoordinates is a valid string");

        // Splitting the string into latitude and longitude
        const [latitude, longitude] = hostelCoordinates.split(", ");

        // Log latitude and longitude for debugging
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Checking if latitude and longitude are valid
        if (latitude !== undefined && longitude !== undefined) {
          console.log("Valid latitude and longitude");

          const hostelLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

          // Creating a new map centered at the hostel's location
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: hostelLocation,
              zoom: 15, // Adjust the zoom level as needed
            }
          );

          // Adding a marker at the hostel's location
          new window.google.maps.Marker({
            position: hostelLocation,
            map: map,
            title: "Hostel Location",
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Change marker color if needed
              scaledSize: new window.google.maps.Size(24, 24),
            },
          });
        } else {
          console.error("Invalid latitude or longitude provided");
        }
      } else {
        console.error("Invalid hostelCoordinates string provided");
      }
    } else {
      console.error("Google Maps API is not available");
    }
  }, [hostelCoordinates]);

  return (
    <>
      <div className="map-container"
      id="map"
      style={{ backgroundColor: "skyblue" }}
    ></div>
    
    </>
  );
}
