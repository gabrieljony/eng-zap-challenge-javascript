export interface Location {
  lon: number;
  lat: number;
}

export interface GeoLocation {
  precision: string;
  location: Location;
}

export interface Addres {
  city: string;
  neighborhood: string;
  geoLocation: GeoLocation;
}

export interface PricingInfo {
  period?: string;
  yearlyIptu?: string;
  price: string;
  rentalTotalPrice?: string;
  businessType: string;
  monthlyCondoFee?: string;
}

export interface ProductObject {
  usableAreas: number;
  listingType: string;
  createdAt: string;
  listingStatus: string;
  id: string;
  parkingSpaces: number;
  updatedAt: string;
  owner: boolean;
  images: string[];
  address: Addres;
  bathrooms: number;
  bedrooms: number;
  pricingInfos: PricingInfo;
}
