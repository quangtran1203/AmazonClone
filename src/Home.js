import React from 'react';
import Footer from './Footer';
import "./Home.css";
import Product from './Product';

function Home() {
    const top = () => {
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image" src="https://i.ytimg.com/vi/FG1EByNnHUU/maxresdefault.jpg" alt="" />
                
                <div className="home_row">
                    <Product id="11" title="The Clean Coder by Robert C.Martin: A Code of Conduct for Professional Programmers." price={24.99} rating={4} image="https://m.media-amazon.com/images/I/51uhS7QO--L.jpg"/>
                    <Product id="12" title="Echo Dot (4th Gen) | Charcoal" price={59.99} rating={5} image="https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/402088-smart-speakers-amazon-echo-4th-gen-10015591.png"/>
                </div>
                <div className="home_row">
                    <Product id="13" title="Alienware S5000 Gaming Chair - truly a gamer's delight." price={389.67} rating={4} image="https://snpi.dell.com/snp/images2/300/en-ca~AA522881/AA522881.jpg" />
                    <Product id="14" title="HP 27fw 27-inch Ultralism Full-HD IPS Monitor." price={209.49} rating={2} image="https://brain-images-ssl.cdn.dixons.com/5/3/10181535/u_10181535.jpg"/>
                    <Product id="15" title="Apex PRO TKL Mechanical Gaming Keyboard" price={232.49} rating={5} image="https://media.steelseriescdn.com/thumbs/filer_public/32/b0/32b0a522-ca13-47cf-a646-ea7f6171febc/buyimg_apexprotkl_006_de.png__1920x1080_q100_crop-fit_optimize_subsampling-2.png"/>
                </div>
                <div className="home_row">
                    <Product id="16" title="Samsung Ultra-Wide 4K Curved Monitor" price={1169.99} rating={4} image="https://azcd.harveynorman.com.au/media/catalog/product/h/g/hg90_edit_4.png"/>
                </div>
                <div className="home_row">
                    <Product id="17" title="R2 Stealth Wolf (Limited Edition) Gaming Desk" price={929.40} rating={3} image="https://www.vhv.rs/dpng/d/245-2458139_gaming-desk-png-transparent-png.png"/>
                    <Product id="18" title="Defender Warhead G-370 black+red, cable 2 m Gaming Headset" price={154.99} rating={3} image="https://defender-global.com/static/products/33/69/98/2/3369982.64037__Warhead_G-370.1920x1014.png"/>
                </div>
                <div className="home_row">
                    <Product id="19" title="Google Nest Mini 2nd Gen Smart Speaker | Chalk" price={48.99} rating={4} image="https://shop.newgendistribution.com/pub_images/original/image_mini2_19_0403_0294_10_white_TTQ_R04_SIMP-small.png"/>
                    <Product id="20" title="Apple Watch Series 5 | Space Grey" price={550.00} rating={5} image="https://shop.ee.co.uk/content/dam/everything-everywhere/images/SHOP/affiliates/apple/Watch_S5_44mm_SpaceGrey+BlackBand_affilliates_800x800.png" />
                    <Product id="21" title="iPhone 12 Pro Max 512GB Graphite" price={1947.99} rating={5} image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021658000"/>
                </div>

                <div className="backtonav">
                    <button className="backbutton" onClick={top}>Back To Top</button>
                </div>

                <div className="footer_section">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Home
