import slugify from 'slugify';
import { getReloading } from '../../../adapters/lightspeed/lightspeed';
import Layout from '../../../components/layout/Layout';
import LightspeedProduct from '../../../components/LightspeedProduct';

let items = null;

export async function getStaticPaths() {
  const data = await getReloading();

  const paths = await data
    .map((item) => ({
      params: {
        slug: slugify(item.description.replace('/', '-'))
          .replace(/["'.,]/g, '')
          .toLocaleLowerCase(),
        id: item.itemID,
      },
    }))
    .filter((path) => path);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  if (!id) {
    return {
      notFound: true,
    };
  }

  if (items != null) {
    return {
      props: { item: items.filter((item) => item.itemID === id)[0] },
      revalidate: 300,
    };
  }

  const data = await getReloading();
  items = data;

  return {
    props: { item: items.filter((item) => item.itemID === id)[0] },
    revalidate: 300,
  };
}

const Item = ({ item }) => {
  // const product = {
  //   name: item.description,
  //   description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
  //   shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
  //   sku: item.customSku,
  //   price: item.Prices.ItemPrice[0].amount.replace('.', ''),
  //   currency: 'GBP',
  //   image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`,
  //   itemID: item.itemID,
  //   unitPrice: item.Prices.ItemPrice[0].amount,
  // }

  if (!item) {
    return (
      <Layout>
        <div>Loading...</div>;
      </Layout>
    );
  }

  return (
    <Layout>
      <LightspeedProduct item={item} />
    </Layout>
  );
};

export default Item;
