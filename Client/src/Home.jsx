import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

// console.log(import.meta.env);
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
const googleOAuthUrl = getGoogleAuthUrl();

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  const video = useRef();
  const playerInstance = useRef();

  useLayoutEffect(() => {
    const source =
      "http://localhost:4000/static/video-hls/jQfunDG-ZMT4zTvYSW9ae/master.m3u8";

    const hls = new Hls();
    hls.loadSource(source);
    window.hls = hls;
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      const availableQualities = hls.levels.map((l) => l.height);
      playerInstance.current = new Plyr(video.current, {
        quality: {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        },
      });
    });
    hls.attachMedia(video.current);
    return () => {
      playerInstance.current.destroy();
    };
  }, [playerInstance, video]);
  // lỗi do anh copy thiêu ông nay
  const updateQuality = (newQuality) => {
    window.hls.levels.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        window.hls.currentLevel = levelIndex;
      }
    });
  };

  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h2>Video Streaming</h2>
      <video controls width={500}>
        <source
          src="http://localhost:4000/static/video/_Ktqj2zaQcLrSavsRXL5S.mp4"
          type="video/mp4"
        />
      </video>
      <h2>HLS Streaming</h2>
      {/* <MediaPlayer
        title="Sprite Fight"
        src="http://localhost:4000/static/video-hls/Gui0fj6ogn9V7QQrYkqdj/master.m3u8"
        // poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
        // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
        aspectRatio={16 / 9}
        crossorigin=""
      > */}
      {/* <MediaOutlet>
          <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" /> */}
      {/* <track
            src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
            label="English"
            srcLang="en-US"
            kind="subtitles"
            default
          />
          <track
            src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
            srcLang="en-US"
            kind="chapters"
            default
          /> */}
      {/* </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer> */}

      <video
        id="player"
        ref={video}
        className="video-js"
        autoPlay
        preload="auto"
      ></video>

      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>
              Hello my <strong>{profile.email}</strong>, you are logged in.
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  );
}
