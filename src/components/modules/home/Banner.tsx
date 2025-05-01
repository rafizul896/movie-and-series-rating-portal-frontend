"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import info_icon from "../../../assets/info_icon.png";
import "../../../style/banner.css";
import { PlayIcon, X } from "lucide-react";
import { bannerMovies } from "@/assets/banner";
import TitleCards from "../shared/TitleCards";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (showVideo) return;

    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % bannerMovies.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [showVideo]);

  const current = bannerMovies[index];

  return (
    <div className="hero">
      <div className={`banner-wrapper ${fade ? "fade" : ""}`}>
        <Image
          src={current.image}
          alt="banner"
          width={1920}
          height={1080}
          priority
          className="banner-img"
        />
        <div className="hero-caption">
          <h1 className="caption-title">{current.title}</h1>
          <p>{current.description}</p>

          <div className="hero-btns">
            <button
              className="btn text-black"
              onClick={() => setShowVideo(true)}
            >
              <PlayIcon />
              Play
            </button>
            <button className="btn dark-btn">
              <Image className="invert" src={info_icon} alt="info" />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>

      {showVideo && (
        <div className="video-overlay">
          <button className="close-btn" onClick={() => setShowVideo(false)}>
            <X size={30} />
          </button>
          <video
            src={current.trailer}
            controls
            autoPlay
            className="video-player"
            onEnded={() => setShowVideo(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
