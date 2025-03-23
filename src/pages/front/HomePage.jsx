import { Link } from "react-router-dom";


// import Swiper from "../../components/Swiper";
import aboutImg from "../../assets/img/about/about-768.webp";
import visitUsImg from "../../assets/img/stores/store01.jpg";
import homeBanner from "../../assets/img/banner/homeBanner-1920.jpg";
import featureImg01 from "../../assets/img/features/feature01.jpg";
import featureImg02 from "../../assets/img/features/feature02.jpg";
import featureImg03 from "../../assets/img/features/feature03.jpg";
import SwiperReviews from "../../components/SwiperReviews";
import Banner from "../../components/front/Banner";

function HomePage() {
  const features = [
    {
      id: 1,
      imageUrl: featureImg01,
      // title: "Natural and Healthy",
      // content1: `Made with pure, natural ingredients, free from artificial colors and preservatives`,
      // content2: `Preserving the original flavors for a truly authentic taste`,
      // content3: `Enjoy delicious treats while embracing a healthier choice`
      title: "健康天然",
      content1: `選用純天然食材，不含人工色素與防腐劑`,
      content2: `保留原始風味，讓每一口都充滿自然的美好`,
      content3: `享受美味的同時，也為健康加分`,
    },
    {
      id: 2,
      imageUrl: featureImg02,
      // title: "Variety and Choice",
      // content1: "A diverse selection of flavors and designs to suit any occasion",
      // content2: "From timeless classics to creative innovations, each treat is unique",
      // content3: "Perfect for everyday indulgence or special celebrations"
      title: "多樣選擇",
      content1: "多種口味與設計，滿足不同場景與需求",
      content2: "從經典到創新，每款都充滿獨特魅力",
      content3: "無論日常或特別時刻，總有適合的美味",
    },
    {
      id: 3,
      imageUrl: featureImg03,
      title: "精緻手工",
      content1: "烘焙師用心手作，每個細節都精雕細琢",
      content2: "選用高品質食材，打造細膩口感與絕佳風味",
      content3: "每一口都是一場極致的甜點體驗",
    },
  ];

  const categories = [
    {
      id: 1,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736360005395.jpg",
      title: "Cupcakes",
    },
    {
      id: 2,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736368354284.jpg",
      title: "Cakes",
    },
    {
      id: 3,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736368727586.jpg",
      title: "Vegan",
    },
    {
      id: 4,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736369195967.jpg",
      title: "Wedding",
    },
    {
      id: 5,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736369644789.jpg",
      title: "Preserves",
    },
    {
      id: 6,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/soniawu/1736370122173.jpg",
      title: "Cookies",
    },
  ];
  
  return (
    <>
      {/* Banner */}
      <Banner imageUrl={homeBanner} height={`800px`} positionX="bottom">
        <div className="ff-noto-sans z-2 text-center">
          <h2 className="lh-lg">
            <span className="fw-semibold">Regis's Cakes</span> <br />
            <p className="fs-4 fs-md-3">無添加的安心甜點<span className="d-none d-md-inline">，</span><br className="d-block d-md-none"/>讓健康也能很美味</p>
          </h2>
          <h4 className="lh-lg fs-5 fs-md-4">
            Pure and natural treats, bringing health and deliciousness together.
          </h4>
          <Link
            to="/products"
            className="btn btn-lg btn-primary-light rounded-0 w-50 mt-5 shadow"
          >
            SHOP NOW
          </Link>
        </div>
      </Banner>
      {/* Features */}
      <div className="py-10">
        <div className="container">
          <h3 className="text-center fw-semibold mb-6">純淨甜點，健康美味</h3>
          {/* <h3 className='text-center fw-semibold'>Pure desserts, healthy and delicious</h3> */}
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`row mb-10 ${
                feature.id % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src={feature.imageUrl}
                  alt={feature.title}
                />
              </div>
              <div className="col-lg-6 text-center d-flex flex-column align-items-center justify-content-center">
                <h4>{feature.title}</h4>
                <p>{feature.content1}</p>
                <p>{feature.content2}</p>
                <p>{feature.content3}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Categories */}
      <div className="bg-light py-10">
        <div className="container">
          <h3 className="text-center mb-6">Our Delicious Selections</h3>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="row row-cols-2 row-cols-lg-3">
                {categories.map((category) => (
                  <div key={category.id} className="col mb-5">
                    <a href="">
                      <h4>{category.title}</h4>
                      <img
                        className="img-fluid"
                        src={category.imageUrl}
                        alt={category.title}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Swiper */}
      <SwiperReviews />

      {/* About and Visit */}
      <div className="bg-light py-10">
        <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div className="card rounded-0">
              <div className="position-relative">
                <img src={aboutImg} className="img-fluid" alt="..." />
                <div className="bg-light bg-opacity-10 h-100 w-100 top-0 position-absolute"></div>
              </div>
              <div className="card-body text-center">
                <h4 className="card-title">About Us</h4>
                <p className="card-text">
                  Discover our story and what makes us unique – click here to
                  learn more!
                </p>
                <Link to="/about" className="btn btn-primary-light rounded-0">
                  FIND OUT MORE
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card rounded-0">
              <img src={visitUsImg} className="img-fluid" alt="..." />
              <div className="card-body text-center">
                <h4 className="card-title">Visit us</h4>
                <p className="card-text">
                  Ready to experience it in person? Find your nearest location
                  here!
                </p>
                <Link to="/stores" className="btn btn-primary-light rounded-0">
                  FIND STORES
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
