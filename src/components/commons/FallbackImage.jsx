// eslint-disable-next-line import/extensions
import fallbackPoster from "assets/images/fallback-poster.svg";

const FallbackImage = ({ alt, className }) => (
  <img alt={alt} className={className} src={fallbackPoster} />
);

export default FallbackImage;
