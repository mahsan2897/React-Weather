import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [weath, setWeath] = useState("");
  const [srch, setSrch] = useState("");
  const [city, setCity] = useState("Karachi");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa9978b91d5b6560db0ffa88c6696e01&units=metric`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.cod !== 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "City not found!",
          });
          setLoading(false);
          return;
        }

        setWeath(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
        setLoading(false);
      });
  }, [city]);

  // ⏳ Loader
  if (loading || weath === "") {
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 py-5">
        {[
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ].map((color) => (
          <div
            key={color}
            className={`spinner-grow text-${color}`}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ))}
      </div>
    );
  }

  // 🌤️ Main UI
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center display-5 fw-bold">🌤️ Open Weather App</h1>

      {/* 🔍 Responsive Search Bar */}
      <div className="d-flex flex-column flex-sm-row mb-4">
        <input
          type="text"
          className="form-control me-sm-2 mb-2 mb-sm-0"
          value={srch}
          placeholder="Enter city name e.g. London"
          onChange={(e) => setSrch(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <button
          className="btn btn-primary"
          disabled={srch === ""}
          onClick={() => setCity(srch)}
        >
          Search
        </button>
      </div>

      {/* 🌍 Weather Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body text-center">
          <h2 className="card-title mb-3">{weath.name} Weather</h2>
          <h4 className="mb-3">{weath.weather[0].main}</h4>
          <h1 className="display-4 fw-bold mb-3">{weath.main.temp}°C</h1>
          <p className="mb-1">
            Feels like: {weath.main.feels_like}°C <br />
            Max: {weath.main.temp_max}°C <br />
            Min: {weath.main.temp_min}°C
          </p>
          <p className="mb-1">Humidity: {weath.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}

export default App;
