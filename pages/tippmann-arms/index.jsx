import Head from 'next/head';
import Image from 'next/image';
import { getTippmann } from '../../adapters/lightspeed/lightspeed';
import TippmannProductCard from '../../components/TippmannProductCard';

export async function getStaticProps() {  
  const getTippmannProducts = await getTippmann();
  const tippmannProducts = getTippmannProducts;

  return {
    props: { tippmannProducts },
    revalidate: 300
  };
}

const Tippmann = ({ tippmannProducts }) => (
  <>
    <Head>
      <title>Tippmann Arms Rifles & Accessories | Shooting Supplies Ltd</title>
      <meta
        name="description"
        content="UK supplier of the fantastic Tippmann Arms M4 rifles and accessories"
      />
      <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk/tippmann-arms" />
    </Head>
    <div className="hidden lg:mx-12 lg:my-8 lg:block">
      <Image src="/banners/tippmannBanner.png" layout="responsive" width={1920} height={380} className="rounded-lg" />
    </div>
    <div className="flex mx-12 my-16 lg:mb-12 lg:my-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {tippmannProducts.map((item) => (
          <div key={item.itemID}>
            <TippmannProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Tippmann;
