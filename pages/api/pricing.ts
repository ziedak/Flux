const defaultPricing = {
  "36months" : {
      "lite" : 2592.8,
      "standard" : 2981.72,
      "unlimited" : 3889.2
  },
  "24months" : {
      "lite" : 3056.09,
      "standard" : 3445.01,
      "unlimited" : 4352.49
  },
  "12months" : {
      "lite" : 3528,
      "standard" : 3916.92,
      "unlimited" : 4824.4
  },
  "mtm" : {
      "lite" : 5880,
      "standard" : 6268.92,
      "unlimited" : 7176.4
  }
}

export default (_: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
  const pricing = require('../../public/pricing.json') || defaultPricing
  res.statusCode = 200
  res.json(pricing)
}
