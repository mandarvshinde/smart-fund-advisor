
import React from "react";
import { Fund } from "@/types";
import FundCard from "./FundCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FundCarouselProps {
  funds: Fund[];
}

export const FundCarousel = ({ funds }: FundCarouselProps) => {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {funds.map(fund => (
            <CarouselItem key={fund.schemeCode} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <FundCard fund={fund} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </div>
      </Carousel>
    </div>
  );
};

export default FundCarousel;
