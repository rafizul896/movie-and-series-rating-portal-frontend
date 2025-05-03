"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import cardData from "../../../assets/cards/Cards_data";
import "../../../style/titleCard.css";

//TODO: You can show there top rated movies. 15 movies is enough.

const TitleCards = () => {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refCurrent = cardsRef.current;
    if (!refCurrent) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      refCurrent.scrollLeft += e.deltaY || e.deltaX;
    };

    refCurrent.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      refCurrent.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-Cards">
      <h2>Top Rated</h2>
      <div className="card-list" ref={cardsRef}>
        {cardData.map((card, index) => {
          return (
            <div key={index} className="card">
              <Image
                src={card.image}
                width={1920}
                height={1080}
                alt={card.name}
                className="card-image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
