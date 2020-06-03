interface PackagePricing {
  lite: number
  standard: number
  unlimited: number
}

export interface Matrix {
  '36months': PackagePricing
  '24months': PackagePricing
  '12months': PackagePricing
  'mtm': PackagePricing
}