import React, { useEffect } from "react";

export default function SimpleMap() {
  useEffect(() => {
    // Check if the Google Maps API is available
    if (window.google) {
      // Get the user's location using the Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords)
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Create a new map centered at the user's location
            const map = new window.google.maps.Map(document.getElementById("map"), {
              center: userLocation,
              zoom: 15, // Adjust the zoom level as needed
            });

            // Add a marker at the user's location
            new window.google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Your Location",
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(24, 24),
              },
            });
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
      }
    } else {
      console.error("Google Maps API is not available");
    }
  }, []); // Run once on component mount

  return (
    <div
      id="map"
      style={{ height: "50vh", width: "100%", backgroundColor: "skyblue" }}
    ></div>
  );
}
