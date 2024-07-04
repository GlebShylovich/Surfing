import "./Error.scss";
export default function Error() {
  return (
    <div className="error">
      <div className="error__container">
        <h1 className="error__title">Oops! Page Not Found</h1>
        <span className="error__subtitle">
          We can't find the page you're looking for. Try checking the URL or go
          back to the homepage.
        </span>
      </div>
    </div>
  );
}
