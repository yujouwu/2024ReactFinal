// 外部資源
import { useState } from "react";

// 內部資源
import storesBanner from "../../assets/img/banner/storesBanner.webp";
import store01 from "../../assets/img/stores/store01.jpg";
import store02 from "../../assets/img/stores/store02.jpg";
import store03 from "../../assets/img/stores/store03.jpg";
import Banner from "../../components/front/Banner";

function StoresPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const stores = [
    {
      id: 1,
      imageUrl: store01,
      city: "London",
      title: "NOTTING HILL, LONDON",
      openTime: "Open Monday – Sunday, 10am – 8pm",
      address: "London W11 3HT",
      mapLink: "https://maps.app.goo.gl/re6r7nUMLkthz6z16",
    },
    {
      id: 2,
      imageUrl: store02,
      city: "London",
      title: "COVENT GARDEN, LONDON",
      openTime: "Open Monday – Sunday, 10am – 8pm",
      address: "Underground Ltd, Long Acre, London WC2E 9JT",
      mapLink: "https://maps.app.goo.gl/wXGpZf8t5KRdNCRU6",
    },
    {
      id: 3,
      imageUrl: store03,
      city: "Birmingham",
      title: "NEW STREET, BIRMINGHAM",
      openTime: "Open Monday – Sunday, 10am – 8pm",
      address: "New Street station, Station St, Birmingham B2 4QA",
      mapLink: "https://maps.app.goo.gl/9HrSQmbAwxDAAXxM8",
    },
  ];

  const cities = ["All", ...new Set(stores.map((store) => store.city))];
  const filteredStores = stores.filter(
    (store) => selectedCity === "All" || store.city === selectedCity
  );
  
  return (
    <>
      <Banner imageUrl={storesBanner}/>
      <div className="py-20">
        <div className="container">
          <h2 className="text-center mb-8">Our Stores</h2>
          <div className="d-flex justify-content-center gap-3 mb-8">
            {cities.map((city, index) => (
              <button
                key={index}
                type="button"
                className={`btn rounded-0 text-black ${
                  selectedCity === city
                    ? "btn-primary-light"
                    : "btn-outline-primary-light"
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className={`py-10 ${store.id % 2 === 0 ? "bg-light" : ""}`}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <img
                    className="img-fluid mb-5 mb-lg-0"
                    src={store.imageUrl}
                    alt={store.title}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="text-center d-flex flex-column align-items-center justify-content-center gap-3">
                    <h4 className="mb-0">{store.title}</h4>
                    <p>{store.address}</p>
                    <a
                      href={store.mapLink}
                      target="_blank"
                      className="btn btn-sm btn-primary-light rounded-0"
                    >
                      <i className="bi bi-geo-alt-fill me-2"></i>GET DIRECTIONS
                    </a>
                    <p>{store.openTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default StoresPage;
