import { Image } from 'react-native';
import DefaultImage from '@/assets/images/default_point_image.png';

export const defaultGuideImageUri = Image.resolveAssetSource(DefaultImage).uri;

export const defaultGuideImage = DefaultImage;
