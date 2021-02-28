import api from './limit';
import refreshToken from './refreshToken';

const token = [];

const getToken = async (n) => {
  if (token[n] != null) {
    console.log('Cached Token');
    return token[n];
  }
  const bearer = await refreshToken();
  console.log('API Token');
  token[n] = bearer;
  return bearer;
};

const getHeader = async () => {
  const bearerToken = await getToken();
  const header = {
    Authorization: `Bearer ${bearerToken}`,
  };
  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header,
  };
  return axiosConfig;
};

const makeRequest = async (url) => {
  const axiosConfig = await getHeader();
  const data = await api.get(url, axiosConfig).catch((err) => console.error(err.response.data));
  return data;
};

export async function getItems() {
  const items = makeRequest(
    `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`
  );
  return items;
}

export async function getItem(itemID) {
  const item = makeRequest(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemECommerce.listOnStore=true`);
  return item;
}

export async function getItemsByCategory(categoryID) {
  const itemsByCategory = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemECommerce.listOnStore=true&categoryID=${categoryID}`);
  return itemsByCategory;
}

export async function getAmmo() {
  const ammo = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[23,46,218]&ItemECommerce.listOnStore=true`);
  return ammo;
}

export async function getAccessories() {
  const accessories = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[77, 153, 73, 2, 262, 163, 21, 78, 261, 24, 263, 76, 166, 212, 56, 59, 42, 103, 104, 236, 66, 145, 207]&ItemECommerce.listOnStore=true`);
  return accessories;
}

export async function getOptics() {
  const optics = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 16, 150, 266, 259]&ItemECommerce.listOnStore=true`);
  return optics;
}

export async function getSecurity() {
  const security = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[206, 124, 131]&ItemECommerce.listOnStore=true`);
  return security;
}

export async function getMaintenance() {
  const maintenance = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&ItemECommerce.listOnStore=true`);
  return maintenance;
}

export async function getClothing() {
  const clothing = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[5]&ItemECommerce.listOnStore=true`);
  return clothing;
}

export async function getMatrixClothing() {
  const matrixClothing = makeRequest(`ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]
  &Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151, 110, 111, 217, 210]&ItemECommerce.listOnStore=true`);
  return matrixClothing;
}

export async function getMatrixClothingItem(itemID) {
  const matrixClothingItem = makeRequest(
    `ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "ItemECommerce"]&ItemECommerce.listOnStore=true`
  );
  return matrixClothingItem;
}

export async function getCategory(categoryID) {
  const category = makeRequest(`Category.json?categoryID=IN,${categoryID}&orderby=name`);
  return category;
}

export async function getCategories() {
  const categories = makeRequest(`Category.json?orderby=name`);
  return categories;
}

export async function getManufacturers(manufacturerID) {
  const manufacturers = makeRequest(`Manufacturer.json?manufacturerID=IN,${manufacturerID}&orderby=name`);
  return manufacturers;
}

export async function createSale(newSale) {
  const axiosConfig = await getHeader();
  const createSaleData = await http
    .post(`Sale.json`, newSale, axiosConfig)
    .catch((error) => console.error(error.data).then((res) => res))
    .catch((err) => console.error(err.data));
  const saleData = await createSaleData;
  return saleData;
}
