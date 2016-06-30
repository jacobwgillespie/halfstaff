import { ASSET_HOST } from './constants';

const useAssetHost = base => manifestValue => `${ASSET_HOST}${base}${manifestValue}`;
const dirReplacements = {
  '/images/': useAssetHost('/images/'),
  '/scripts/': useAssetHost('/scripts/'),
  '/styles/': useAssetHost('/styles/'),
  '/': '/',
};

export default dirReplacements;
