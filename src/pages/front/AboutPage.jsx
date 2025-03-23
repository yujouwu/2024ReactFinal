import aboutBanner from "../../assets/img/about/about-1920.webp";
import passionImg from "../../assets/img/about/about-passion.jpg";
import storyImg from "../../assets/img/about/about-story.jpg";
import Banner from "../../components/front/Banner";

function About(){
  return (
    <>
      <Banner imageUrl={aboutBanner} />
      <div className="container py-20">
        <h2 className="text-center mb-5">About Us</h2>
        <div className="row align-items-center mb-10">
          <div className="col-lg-6">
            <img className="img-fluid" src={passionImg} alt="" />
          </div>
          <div className="col-lg-6 text-center">
            <h3 className="mb-0">Our Passion</h3>
            <p className="fs-5 mb-3">Natural, and Enjoyable Indulgence</p>
            <p>
              At Regis’s Cakes, we are dedicated to combining the finest natural ingredients with exceptional craftsmanship to create cakes that are not only delicious but also healthy. We use no additives or artificial ingredients—only the purest, highest-quality ingredients—to ensure that every bite brings pure enjoyment.
            </p>
            <p>
              Whether it’s a birthday, wedding, or any special occasion worth celebrating, Regis’s Cakes aims to bring happiness through every cake we make. Every detail reflects our commitment to quality and natural goodness. Let us add more sweetness and joy to your life with our wholesome treats.
            </p>
          </div>
        </div>
        <div className="row flex-row-reverse align-items-center">
          <div className="col-lg-6">
            <img className="img-fluid" src={storyImg} alt="" />
          </div>
          <div className="col-lg-6 text-center">
          <h3 className="mb-0">Our Story</h3>
            <p className="fs-5 mb-3">A Legacy of British Baking</p>
            <p>
              The story of Regis’s Cakes began in a small family-owned bakery in the UK. Decades ago, the first generation of the Regis family opened a quaint shop on the outskirts of London, specializing in handcrafted traditional British pastries. Their dedication to using only natural ingredients and their meticulous baking techniques quickly earned the trust of the local community.
            </p>
            <p>
              As the years passed, this passion for baking was passed down through generations, evolving into what we now know as Regis’s Cakes. While we continue to uphold our family’s commitment to high-quality cakes, we also embrace modern values of healthy living. Our mission is to preserve classic flavors while meeting today’s desire for pure, natural, and wholesome treats.
            </p>
          </div>
        </div>
        
        
      </div>
    </>
  )
}

export default About