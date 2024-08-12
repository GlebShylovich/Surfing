import "./Map.scss"

export default function Map({ location }) {
  return (
    <iframe
      className="map"
      src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76622.1546599684!2d${location[0]}!3d${location[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spl!4v1723273576638!5m2!1sen!2spl&amp;output=embed`}
      height="200"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  );
}
