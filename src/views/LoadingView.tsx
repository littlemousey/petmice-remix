import loadingMouseGif from "../assets/loading-mouse.gif";

export default function LoadingView() {
  return (
    <div className="loading-container">
      <img src={loadingMouseGif} alt="Loading..." />
      <p>Hold on, mice incoming...</p>
      <p>If nothing happens, try turning off ad blockers and reload again</p>
    </div>
  );
}
