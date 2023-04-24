(async () => {
    'use strict';    
    
    // 발생현황 API 키
    const API_KEY = 'zjnXeuyUCvbWrPxB%2BPa1QNz6mCErAe1iaExwLX3UAT66D231%2BE%2FeNbZcTHYRGjXb9p2JuEZ1MhzrDoxMmGKpqw%3D%3D';
    
    // 병상현황 API 키
    const BEDSIDE_API_KEY = "zjnXeuyUCvbWrPxB%2BPa1QNz6mCErAe1iaExwLX3UAT66D231%2BE%2FeNbZcTHYRGjXb9p2JuEZ1MhzrDoxMmGKpqw%3D%3D";

    //typing 애니메이션
    const subContent = "코로나 19 국내 발생현황";
    const subThisTime = document.querySelector('.sub_this_time');

    let index = 0; // typing index    

    function subTyping() {
        subThisTime.textContent += subContent[index++];
        if(index > subContent.length){
        subThisTime.textContent = ""
        index = 0;
        clearInterval(subTypingSet);
        subThisTime.textContent = subContent;
        }
    }
    const subTypingSet = setInterval(subTyping, 300);


    //숫자 카운트 애니메이션
    const counter = (el, value) => {
        let count = 0;

        const interval = setInterval(() => {
            if(count === value) {
                clearInterval(interval);
            }else{
                count += Math.floor((Math.random() * (Math.floor(value * .05) - 1)) + 1);
    
                if(count > value) {
                    count = value;
                }
    
                el.innerText = count;
            }
        }, 10);
    };

    const getTodayData = async () => (await (await fetch(`http://apis.data.go.kr/1790387/covid19CurrentStatusKorea/covid19CurrentStatusKoreaJason?serviceKey=${API_KEY}`)).json()).response.result[0];

    const todayData = await getTodayData();

    //스크롤 시 숫자 카운트 애니메이션
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if(entry.isIntersecting) {

                // 일일 확진자
                counter(document.querySelector('.today_19'), parseFloat(todayData.cnt_confirmations));
                // 사망자
                counter(document.querySelector('.today_dead'), parseFloat(todayData.cnt_deaths));
                // 재원 위중증 환자
                counter(document.querySelector('.today_patient'), parseFloat(todayData.cnt_severe_symptoms));
                // 신규입원
                counter(document.querySelector('.today_hospitalization'), parseFloat(todayData.cnt_hospitalizations));

                observer.unobserve(entry.target);
            }

        })
    }, {
        threshold: 1
    })

    const mainWrap = document.querySelector('.main_wrap');
    observer.observe(mainWrap);
    


    //스크롤 시 투명도 재생
    let animationObserver = new IntersectionObserver((slide) => {
        slide.forEach(slides => {
            if(slides.isIntersecting){
                slides.target.style.opacity = 1;
                slides.target.style.transition = '1s';
            }
        })
    }, {
        threshold : 1
    })

    const currentAnimation = document.querySelectorAll('.current_animation');
    animationObserver.observe(currentAnimation[0]);
    animationObserver.observe(currentAnimation[1]);

    // 새로고침 시간
    const thisTime = document.querySelector('.this_time');

    thisTime.innerText = `(${todayData.mmddhh} 기준, 단위: 명 )`;


    const getBedsideData = async () => (await (await fetch(`http://apis.data.go.kr/1790387/covid19HospitalBedStatus/covid19HospitalBedStatusJson?servicekey=${BEDSIDE_API_KEY}`)).json()).response.result[0];

    const bedsideData = await getBedsideData();


    // 중환자 병상 가동률
    const criticalWork = document.querySelector('.critical_work');

    criticalWork.innerText = `${bedsideData.itsv_bed_opr}%`;
    
    // 중환자 보유 병상수
    const criticalPossession = document.querySelector('.critical_possession');

    criticalPossession.innerText = bedsideData.itsv_bed_rtn;
    
    // 중환자 가용 병상수
    const criticalAvailability = document.querySelector('.critical_availability');

    criticalAvailability.innerText = bedsideData.itsv_bed_avlb;
    
    // 일반 병상 가동률
    const generalWork = document.querySelector('.general_work');

    generalWork.innerText = `${bedsideData.nm_bed_opr}%`;
    
    // 일반 보유 병상수
    const generalPossession = document.querySelector('.general_possession');

    generalPossession.innerText = bedsideData.nm_bed_rtn;
    
    // 일반 가용 병상수
    const generalAvailability = document.querySelector('.general_availability');

    generalAvailability.innerText = bedsideData.nm_bed_avlb;
    
    // 새로고침 시간
    const sickbedTime = document.querySelector('.sickbed_time');

    sickbedTime.innerText = `( ${bedsideData.status_date} ${bedsideData.status_time}시 기준 )`;

    // 스크롤 시 글자 슬라이드
    let ciriticalObserver = new IntersectionObserver((text) => {
        text.forEach(texts => {
            if(texts.isIntersecting){
                texts.target.classList.add('ciritical_slides');
            }
        })
    })

    const ciriticalSlide = document.querySelectorAll('.ciritical_slide');
    ciriticalObserver.observe(ciriticalSlide[0]);
    ciriticalObserver.observe(ciriticalSlide[1]);
    ciriticalObserver.observe(ciriticalSlide[2]);
    ciriticalObserver.observe(ciriticalSlide[3]);

    let ciriticalLeftObserver = new IntersectionObserver((text) => {
        text.forEach(texts => {
            if(texts.isIntersecting){
                texts.target.classList.add('ciritical_left_slides');
            }
        })
    })

    const ciriticalLeftSlide = document.querySelectorAll('.ciritical_left_slide');
    ciriticalLeftObserver.observe(ciriticalLeftSlide[0]);
    ciriticalLeftObserver.observe(ciriticalLeftSlide[1]);
    ciriticalLeftObserver.observe(ciriticalLeftSlide[2]);
    ciriticalLeftObserver.observe(ciriticalLeftSlide[3]);

    // 스크롤 시 이미지 슬라이드
    let imgObserver = new IntersectionObserver((img) => {
        img.forEach(imgs => {
            if(imgs.isIntersecting){
               imgs.target.classList.add('corona_img_animation');
            }
        })
    })

    let imgSlideObserver = new IntersectionObserver((img) => {
        img.forEach(imgs => {
            if(imgs.isIntersecting){
               imgs.target.classList.add('corona_animation');
            }
        })
    })
    
    const coronaImg = document.querySelectorAll('.img_slide');
    imgObserver.observe(coronaImg[0]);
    imgSlideObserver.observe(coronaImg[1]);
})();