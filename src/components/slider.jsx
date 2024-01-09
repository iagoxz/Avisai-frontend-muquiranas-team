import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';

// import axios from 'axios';

export default function App() {
  // const [infoCards, setInfoCards] = useState([]);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // async function CardInfo() {
  //   try {
  //     const { data } = await axios.get("http://localhost:3000/post/listar");
  //     setInfoCards(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // }
  // useEffect(() => {
  //   CardInfo();
  // }
  //   , []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay , Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {/* {infoCards.map((infoCard) => (
          <SwiperSlide key={infoCard._id}>
            <div className="card">
              <img style={{
                width: '50%',
                height: '50%',
                objectFit: 'cover',
                borderRadius: '4px',
              }} src={infoCard.imageUrl} alt={infoCard.createdAt} />
            </div>
          </SwiperSlide>
        ))} */}

        <SwiperSlide><img src={img1} alt="Image 1" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="Image 2" /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="Image 3" /></SwiperSlide>
        <SwiperSlide><img src={img4} alt="Image 4" /></SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}

