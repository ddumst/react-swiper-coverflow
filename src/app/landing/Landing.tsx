import React, { FC, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

import { Swiper as SwiperOriginal, Autoplay, Navigation } from "swiper";
import { AGENTS } from '../../dummy-data';

const { Content } = Layout;

interface ProgressSlide extends HTMLElement {
  progress: number;
}

const Landing: FC = () => {
  const [ swiperEl, setSwiperEl ] = useState<HTMLElement>();
  const [ swiperWrapper, setSwiperWrapper ] = useState<HTMLElement>();

  const pointerDownSlideListener = (event: any) => {
    event.stopImmediatePropagation();
    event.preventDefault();
  };

  useEffect(() => {
    setSwiperEl(document.getElementById("carousel-swiper") || undefined);
    setSwiperWrapper(swiperEl?.querySelector(".swiper-wrapper") as HTMLElement || undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Content className="container text-center py-4 px-0">
        <h1 className="text-4xl mb-4 mt-2">Welcome to the React + Swiper Coverflow Effect</h1>

        <Swiper
          id="carousel-swiper"
          watchSlidesProgress={true}
          loop={true}
          autoplay={{
            delay: 3000
          }}
          loopedSlides={5}
          spaceBetween={10}
          slidesPerView={'auto'}
          centeredSlides={true}
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".swiper-partner-next",
            prevEl: ".swiper-partner-prev",
          }}
          onBeforeTransitionStart={() => {
            const slideAnchors = swiperWrapper?.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
            for (let i = 0; i < slideAnchors?.length; i++) {
              const slideAnchor = slideAnchors[i];
              slideAnchor.removeEventListener(
                "pointerdown",
                pointerDownSlideListener,
                true
              );
              slideAnchor.addEventListener(
                "pointerdown",
                pointerDownSlideListener,
                true
              );
            }
          }}
          onSetTransition={(swiper: SwiperOriginal, duration: number) => {
            for (let i = 0; i < swiper.slides.length; i += 1) {
              const slideEl = swiper.slides[i] as HTMLElement;
              const opacityEls = slideEl.querySelectorAll(
                ".carousel-slider-animate-opacity"
              ) as NodeListOf<HTMLElement>;
              slideEl.style.transitionDuration = `${duration}ms`;
              opacityEls.forEach((opacityEl) => {
                opacityEl.style.transitionDuration = `${duration}ms`;
              });
            }
          }}
          onProgress={(swiper: SwiperOriginal) => {
            const scaleStep = 0.11;
            const getSlideScale = (progress: number) => {
              return 1 - Math.abs(progress) * scaleStep;
            }

            const getTranslateOffsetStep = (progress: number): number => {
              if (progress < 1) {
                return 0;
              }
              return 1 - getSlideScale(progress) + getTranslateOffsetStep(progress - 1);
            }

            const getTranslateOffset = (progress: number): number => {
              // Can get non-integer values on first render
              if (progress < 1) {
                return 0;
              }
              return (
                (1 - getSlideScale(progress)) * 0.5 + getTranslateOffsetStep(progress - 1)
              );
            }

            const zIndexMax = swiper.slides.length;
            for (let i = 0; i < swiper.slides.length; i += 1) {
              const slideEl = swiper.slides[i] as ProgressSlide;
              const slideProgress = slideEl.progress as number;
              const absProgress = Math.abs(slideProgress);
              const progressSign = absProgress === 0 ? 0 : slideProgress / absProgress;
              const opacityEls = slideEl.querySelectorAll(
                '.carousel-slider-animate-opacity',
              ) as NodeListOf<HTMLElement>;
              const translate = `${progressSign * getTranslateOffset(absProgress) * 100}%`;  
              const scale = getSlideScale(slideProgress) as number;
              const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
              slideEl.style.transform = `translateX(${translate}) scale(${scale})`;
              slideEl.style.zIndex = String(zIndex);
              if (absProgress > 3) {
                slideEl.style.opacity = String(0);
              } else {
                slideEl.style.opacity = String(1);
              }

              opacityEls.forEach((opacityEl) => {
                opacityEl.style.opacity = (1 - absProgress / 3).toString();
              });
            }
          }}
        >
          {AGENTS.map((agent) => {
            return (
              <SwiperSlide
                key={agent.displayName}
                className="border-[1px] rounded-lg overflow-hidden"
              >
                <div 
                  className="flex items-center relative h-full bg-center bg-no-repeat bg-cover" 
                  style={{ backgroundImage: 'url("https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltbded518020183769/5eb26f5389bac8148a8006cc/agent-background-generic.JPG")'}}
                >
                  <img
                    className="z-10"
                    src={agent.bustPortrait}
                    alt={agent.displayName}
                  />
                  <div className="flex flex-col justify-between items-center absolute p-10 top-0 left-0 right-0 bottom-0 z-10">
                    <div>
                      <div className="text-white font-extrabold uppercase text-2xl">{agent.displayName}</div>
                      <div className="text-white font-extrabold uppercase text-md">
                        // ROLE: {agent.role.displayName}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a 
                        href={`https://playvalorant.com/en-us/agents/${agent.displayName}/`}
                        className="text-white font-extrabold uppercase text-lg rounded-3xl bg-[#e94b5a] px-4 py-2"
                        target={"_blank"}
                      >
                        view agent
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Content>
    </>
  )
};

export default Landing;
