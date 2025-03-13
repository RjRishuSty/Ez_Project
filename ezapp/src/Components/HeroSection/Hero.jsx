import React, { useEffect, useState } from "react";
import Styles from "./Hero.module.css";
import Cards from "../Cards/Cards";
import { cardsData } from "../../cardData";
import logo from "../../assets/logo.png";
import EmailForm from "../EmailForm/EmailForm";

const Hero = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isMobile,setIsMobile] = useState(false);
    useEffect(()=>{
        const handleResize = ()=>setWidth(window.innerWidth);
        if(width <=900){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize)
    },[width,isMobile])
    console.log(width)
  return (
    <section className={Styles.heroSection}>
      <div className={Styles.logowithForm}>
        <img src={logo} className={Styles.logoImg} alt="Ez Works" />
        <h4 className={Styles.title}>Suite Of Business Support Services</h4>
        <p className={Styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed
        </p>
        {isMobile?"":<EmailForm /> }
      </div>
      <div className={Styles.services}>
        {cardsData.map((item) => (
          <Cards item={item} />
        ))}
      </div>
      {
        isMobile&&<EmailForm/>
      }
    </section>
  );
};

export default Hero;
