import PropTypes from "prop-types"

function Banner({imageUrl, height = "400px", positionX = "center", children}){
  return (
    <div
            className="d-flex justify-content-center align-items-center position-relative"
            style={{
              backgroundImage: `url(${imageUrl})`,
              minHeight: height,
              backgroundSize: "cover",
              backgroundPosition: `${positionX} center`,
              backgroundRepeat: "no-repeat",
              marginTop: "-56px",
            }}
          >
            <div className="bg-light bg-opacity-25 h-100 w-100 position-absolute"></div>
            {children}
          </div>
  )
}
Banner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.string,
  positionX: PropTypes.string,
  children: PropTypes.object,
}
export default Banner